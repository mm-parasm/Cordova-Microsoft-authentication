import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingUrls } from 'src/app/shared/const/routing-const';
import { Subject, Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HeaderService } from 'src/app/shared/services/header.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { PublicClientApplication } from '@azure/msal-browser';
import {
  azureNativeConfig,
  azureWebConfig,
  environment,
} from 'src/environments/environment';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { api_URL } from 'src/app/shared/const/api_Uri';

@Component({
  selector: 'bin-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  public isuserLoggedin: boolean;
  public subscription: Subscription;
  private readonly _distroy = new Subject<void>();
  msalInstance!: PublicClientApplication;
  msalConfig: any;
  public userName: any;

  constructor(
    private route: Router,
    private platform: Platform,
    private _headerService: HeaderService,
    private inAppBrowser: InAppBrowser,
    private _sharedService: SharedDataService,
    private _crudService: CrudService<any, any>

  ) {
    this.msalInstance = new PublicClientApplication({
      auth: {
        clientId: '5c175001-f42d-41b4-9b95-41d4a6f6df1a',
        authority:
          'https://login.microsoftonline.com/b0460f52-1655-4c16-93a2-89a33ebd8d76',
        redirectUri: platform.is('hybrid')
          ? 'planetaid.binmanagement://home'
          : 'http://localhost:4200',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
      },
      system: {
        allowNativeBroker: true,
      },
      framework: {
        capacitor: true,
      },
    });
    this.msalConfig = platform.is('hybrid')
      ? azureNativeConfig
      : azureWebConfig;
  }

  public ngOnInit(): void {
  }

  public ionViewWillEnter(): void {
    this._headerService.setHeader({
      headerTitle: 'Login',
      isBackNavigationVisible: true,
      isHeaderVisible: false,
    });
  }

  public login(event: any) {
    this.msalInstance = new PublicClientApplication(this.msalConfig);
    const clientId = '5c175001-f42d-41b4-9b95-41d4a6f6df1a';
    const tenantId = environment.tenantId;
    const redirectUri = this.platform.is('hybrid') ? 'planetaid.binmanagement://home' : 'http://localhost:8100';

    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&response_mode=fragment&scope=openid%20profile%20email`;

    const browser = this.inAppBrowser.create(url, '_self', {
      location: 'no',
      hidenavigationbuttons: 'yes',
      clearcache: 'yes',
      clearsessioncache: 'yes',
      hideurlbar: 'yes',
      fullscreen: 'yes',
      shouldPauseOnSuspend: 'yes',
      toolbar: 'no',
      zoom: 'no',
    });

    browser.on('loadstart').subscribe((event) => {
      if (event.url.includes('#access_token')) {
        const parts = event.url.split('#');
        if (parts.length === 2 && parts[1].startsWith('access_token=')) {
          let accessToken = parts[1].split('=')[1];
          let index = accessToken.indexOf('&token_type');
          if (index !== -1) {
            accessToken = accessToken.slice(0, index);
          }
          this._sharedService.login(accessToken);
        }
        browser.close();
      }
      if (event.url.includes('/logout')) {
        browser.close();
        window.location.replace('/logout');
      }
    });

    browser.on('loaderror').subscribe((event) => {
      if (event.url.includes('error')) {
        browser.close();
        this.route.navigate([`/${RoutingUrls.Login}`]);
      }
    })
    browser.on("exit").subscribe((e) => {
      this._crudService.findAll(api_URL.user_microsft_graph_details).subscribe((res) => {
        this.userName = res.displayName;
        this._sharedService.setUserName(this.userName);
      })
    })
    return true;
  }

  ngOnDestroy(): void {
    this._distroy.next(undefined);
    this._distroy.complete();
  }

  public ionViewDidEnter(): void {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
}
