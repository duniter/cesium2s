import { Environment } from './environment.class';
import { StorageDrivers } from '@app/shared/services/storage/storage.utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json');

export const environment = <Environment>{
  name: pkg.name as string,
  version: pkg.version as string,
  production: true,

  useHash: false,
  defaultLocale: 'fr',

  graphql: {
    fetchPolicy: 'cache-first',
    watchFetchPolicy: 'cache-and-network',
    persistCache: false, // TODO test enabled
    fetchSize: 20,
  },

  // Storage
  storage: {
    name: 'cesium2',
    driverOrder: [StorageDrivers.IndexedDB, StorageDrivers.WebSQL, StorageDrivers.LocalStorage],
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
    'https://gdev-squid.axiom-team.fr/v1beta1/relay',
    'https://squid.gdev.coinduf.eu/v1beta1/relay',
    //'https://gdev-squid.axiom-team.fr/graphql'
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
