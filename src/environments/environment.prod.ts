import { Environment } from "./environment.class";
const pkg = require('../../package.json')

export const environment: Environment = {
    production: true,
    baseUrl: '/',
    remoteBaseUrl: 'http://g1.cgeek.fr:15000',
    defaultLocale: 'en',
    defaultLatLongFormat: 'DDMM',
    version: (pkg.version as string),
    apolloFetchPolicy: 'network-only'
};
