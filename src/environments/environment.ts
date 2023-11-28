// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "./environment.class";
import {StorageDrivers} from "@app/shared/services/storage/storage.utils";
import {AuthData} from "@app/account/account.model";

export const environment = <Environment>{
  production: true,

  name: 'Cesium&sup2;',

  defaultLocale: 'fr',

  // Storage
  storage: {
    name: 'cesium',
    driverOrder: [StorageDrivers.IndexedDB, StorageDrivers.WebSQL, StorageDrivers.LocalStorage]
  },

  keyring: {
    ss58Format: 42 // dev
  },

  dev: {
    peer: 'ws://127.0.0.1:9944',
    //peer: 'wss://gdev.komun.org/ws',
    // peer: 'wss://gdev.librelois.fr/ws',

    auth: <AuthData>{
      address: '5GAT6CJW8yVKwUuQc7sM5Kk9GZVTpbZYk9PfjNXtvnNgAJZ1',
      v1: {
        salt: 'test', password: 'test'
      },
      meta: {
        name: 'Compte v1'
      }
    }
  },

  defaultPeers: [
    'ws://127.0.0.1:9944',
    /* GDev endpoints */
    //'wss://gdev.librelois.fr/ws',
    //'wss://gdev.komun.org/ws',
    //'wss://1000i100.fr/ws'
  ]
};
