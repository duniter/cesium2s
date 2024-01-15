import { Environment } from './environment.class';
import { StorageDrivers } from '@app/shared/services/storage/storage.utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json');

export const environment = <Environment>{
  name: pkg.name as string,
  version: pkg.version as string,
  production: true,

  defaultLocale: 'fr',

  // Storage
  storage: {
    driverOrder: [StorageDrivers.IndexedDB, StorageDrivers.WebSQL, StorageDrivers.LocalStorage],
  },

  defaultPeers: [
    /* GDev public endpoints */
    'wss://gdev.coinduf.eu/ws',
    'wss://vit.fdn.org/ws',
    'wss://gdev.pini.fr/ws',
    'wss://gdev.cgeek.fr/ws',
    'wss://gdev.p2p.legal/ws',
    //'wss://1000i100.fr/ws',
  ],

  defaultIndexers: ['https://subsquid.gdev.coinduf.eu/graphql'],
};
