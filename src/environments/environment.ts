// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "./environment.class";
import {AuthData} from "@app/auth/auth.model";
import {Drivers} from "@ionic/storage";

export const environment = <Environment>{
  //production: true,
  production: false,

  name: 'Cesium',

  defaultLocale: 'fr',

  // Storage
  storage: {
    name: 'cesium',
    driverOrder: ['localForage-cordovaSQLiteDriver', Drivers.IndexedDB, Drivers.LocalStorage]
  },

  keyring: {
    ss58Format: 42 // dev
  },

  dev: {
    //peer: 'ws://localhost:9944',
    //peer: 'wss://gdev.komun.org/ws',
    peer: 'wss://gdev.librelois.fr/ws',

    auth: <AuthData>{
      v1: {
        salt: 'test', password: 'test'
      }
    }
  },

  defaultPeers: [
    //'ws://localhost:9944/ws',
    /* GDev endpoints */
    'wss://gdev.librelois.fr/ws',
    //'wss://gdev.komun.org/ws',
    //'wss://1000i100.fr/ws'
  ]
};
