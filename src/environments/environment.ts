// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./environment.class";
const pkg = require('../../package.json')

export const environment: Environment = {
    production: false,
    baseUrl: '/',
    defaultLocale: 'en',
    version: (pkg.version as string),
    apolloFetchPolicy: 'network-only',
    persistCache: false,

    defaultPeer: {
        host: "192.168.0.45",
        port: 15000,
        useSsl: false
    },

    defaultPeers: [
        // {
        //     host: "g1.duniter.fr",
        //     port: 443,
        //     useSsl: true
        // },
        // {
        //     host: "g1.duniter.org",
        //     port: 443,
        //     useSsl: true
        // },
        // {
        //     host: "g1.nordstrom.duniter.org",
        //     port: 443,
        //     useSsl: true
        // },
        // {
        //     host: "g1.cgeek.fr",
        //     port: 443,
        //     useSsl: true
        // },
        // {
        //     host: "server.e-is.pro",
        //     port: 15000,
        //     useSsl: false
        // },


        // {
        //     host: "dev.g1.dunitrust.org",
        //     port: 443,
        //     useSsl: true
        // },
        // {
        //     host: "77.152.31.154",
        //     port: 10901,
        //     useSsl: false
        // }

    ],

    timeout: 50000
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error';
