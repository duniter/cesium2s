// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './environment.class';
import { StorageDrivers } from '@app/shared/services/storage/storage.utils';

import { AuthData } from '@app/account/auth/auth.model';

export const environment = <Environment>{
  production: false,

  name: 'Cesium&sup2;',

  defaultLocale: 'fr',

  graphql: {
    fetchPolicy: 'cache-first',
    watchFetchPolicy: 'cache-and-network',
    persistCache: false,
    fetchSize: 20,
  },

  // Storage
  storage: {
    name: 'cesium2',
    driverOrder: [StorageDrivers.IndexedDB, StorageDrivers.WebSQL, StorageDrivers.LocalStorage],
  },

  keyring: {
    ss58Format: 42, // dev
  },

  dev: {
    //peer: 'ws://127.0.0.1:9944',
    peer: 'wss://gdev.coinduf.eu/ws',
    //peer: 'wss://gdev.cgeek.fr/ws',

    auth: <AuthData>{
      v1: {
        salt: 'test',
        password: 'test',
      },
      meta: {
        name: 'Compte test v1',
        default: false,
      },
    },
  },

  defaultPeers: [
    //'ws://127.0.0.1:9944',
    /* GDev endpoints */
    'wss://gdev.coinduf.eu/ws',
    'wss://vit.fdn.org/ws',
    'wss://gdev.pini.fr/ws',
    'wss://gdev.cgeek.fr/ws',
    'wss://gdev.p2p.legal/ws',
    //'wss://1000i100.fr/ws',
  ],

  defaultIndexers: [
    'https://gdev-squid.axiom-team.fr/v1beta1/relay',
    //'https://gdev-squid.axiom-team.fr/graphql'
  ],
};
