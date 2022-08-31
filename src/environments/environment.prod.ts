import {Environment} from "./environment.class";
import {StorageDrivers} from "@app/shared/services/storage/storage.utils";

export const environment = <Environment>{
  production: true,
  name: 'Cesium2',

  defaultLocale: 'fr',

  // Storage
  storage: {
    driverOrder: [StorageDrivers.IndexedDB, StorageDrivers.WebSQL, StorageDrivers.LocalStorage]
  },

  defaultPeers: [
    /* GDev public endpoints */
    'wss://gdev.komun.org/ws',
    'wss://1000i100.fr/ws'
  ]
};
