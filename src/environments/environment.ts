// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "./environment.class";

export const environment = <Environment>{
  production: false,
  name: 'Cesium2',

  defaultLocale: 'fr',

  // Storage
  storage: {
    name: 'decsium-dev',
    driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
  },

  keyring: {
    ss58Format: 42 // dev
  },

  dev: {
    //peer: 'ws://localhost:9944',
    peer: 'wss://gdev.komun.org/ws',

    auth: {
      username: 'abc', password: 'def'
    }
  },

  defaultPeers: [
    'ws://localhost:9944/ws',
    /* GDev endpoints */
    'wss://gdev.komun.org/ws',
    'wss://1000i100.fr/ws'
  ]
};
