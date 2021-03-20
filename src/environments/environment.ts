// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // 取得したFirebaseの情報を設定してください
  firebase: {
    apiKey: "AIzaSyD6Nj9eClV6DKn34uocI_fukwiF_wtTnk8",
    authDomain: "angular-chat-app-ac5c1.firebaseapp.com",
    projectId: "angular-chat-app-ac5c1",
    storageBucket: "angular-chat-app-ac5c1.appspot.com",
    messagingSenderId: "25944994275",
    appId: "1:25944994275:web:84a3257df682edf6b2b0d6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
