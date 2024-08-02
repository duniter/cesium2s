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
    indexer: 'https://squid.gdev.coinduf.eu/v1beta1/relay',

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
    /* Local endpoint */
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
    /* Local endpoint */
    //'http://localhost:8080/v1/graphql',
    /* GDev endpoints */
    'https://squid.gdev.coinduf.eu/v1beta1/relay',
    //'https://gdev-squid.axiom-team.fr/graphql'
    // 'https://gdev-squid.axiom-team.fr/v1beta1/relay',
  ],

  defaultPods: [
    /* Local endpoint */
    // 'http://localhost:8081/v1/graphql'
    /* GDev endpoints */
    'https://datapod.coinduf.eu/v1/graphql',
  ],

  defaultIfpsGateways: [
    /* Local endpoint */
    // 'http://localhost:8080'
    /* GDev endpoints */
    'https://pagu.re',
  ],
};
