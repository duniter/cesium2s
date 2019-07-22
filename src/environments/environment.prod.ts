import { Environment } from "./environment.class";
const pkg = require('../../package.json')

export const environment: Environment = {
    production: true,
    baseUrl: '/',
    defaultLocale: 'fr',
    version: (pkg.version as string),
    apolloFetchPolicy: 'network-only',
    persistCache: false,

    defaultPeers: [
        {
            host: "g1.cgeek.fr",
            port: 15000,
            useSsl: true
        }
    ]
};
