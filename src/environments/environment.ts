// // This file can be replaced during build by using the `fileReplacements` array.
// // `ng build` replaces `environment.ts` with `environment.prod.ts`.
// // The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
// };

// /*
//  * For easier debugging in development mode, you can import the following file
//  * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
//  *
//  * This import should be commented out in production mode because it will have a negative impact
//  * on performance if an error is thrown.
//  */
// // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
 
export const environment = {
  production: false,
  // baseApiUrl: 'https://localhost:5001',
  baseApiUrl: 'http://mminfra:9089',
  tenantId: 'b0460f52-1655-4c16-93a2-89a33ebd8d76',
  clientId: '5c175001-f42d-41b4-9b95-41d4a6f6df1a',
  redirectUri: 'https://localhost/login',
  authority: 'https://login.microsoftonline.com/b0460f52-1655-4c16-93a2-89a33ebd8d76',
  postLogoutRedirectUri: 'http://localhost:4200/login',
 
};
 
export const azureWebConfig: any = {
  auth: {
    clientId: '5c175001-f42d-41b4-9b95-41d4a6f6df1a',
    authority: 'https://login.microsoftonline.com/b0460f52-1655-4c16-93a2-89a33ebd8d76',
    redirectUri: 'http://localhost:4200/login'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  },
  system: {
    allowNativeBroker: false, // Disables native brokering support
  }
};
 
export const azureNativeConfig: any = {
  auth: {
    clientId: '5c175001-f42d-41b4-9b95-41d4a6f6df1a',
    authority: 'https://login.microsoftonline.com/b0460f52-1655-4c16-93a2-89a33ebd8d76',
    redirectUri: 'planetaid.binmanagement://home'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  },
  system: {
    allowNativeBroker: false, // Disables native brokering support
  }
}
 
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.