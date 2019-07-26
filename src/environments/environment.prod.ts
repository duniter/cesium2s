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
            useSsl: false
        },
        {
            host: "g1.duniter.fr",
            port: 443,
            useSsl: true
        },
        {
            host: "server.e-is.pro",
            port: 15000,
            useSsl: false
        }
    ]
};
