import {Environment} from "./environment.class";

export const environment = <Environment>{
  production: true,
  name: 'Cesium2',

  defaultLocale: 'fr',

  // Storage
  storage: {
    driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
  },

  defaultPeers: [
    /* GDev public endpoints */
    'wss://gdev.komun.org/ws',
    'wss://1000i100.fr/ws'
  ]
};
