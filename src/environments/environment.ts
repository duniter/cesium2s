// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./environment.class";
const pkg = require('../../package.json')

export const environment: Environment = {
    production: false,
    baseUrl: '/',
    remoteBaseUrl: 'http://g1.cgeek.fr:15000',
    defaultLocale: 'en',
    defaultLatLongFormat: 'DDMM',
    version: pkg.version as string,
    apolloFetchPolicy: 'cache-first'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error';
