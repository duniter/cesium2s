import {FetchPolicy} from "apollo-client";
export class Environment {
    name?: string;
    version: string;
    production: boolean;
    baseUrl: string;
    defaultLocale: string;
    apolloFetchPolicy?: FetchPolicy;
    mock?: boolean;

    // A peer to use at startup (useful on a web site deployment)
    defaultPeer?: { host: string; port: number; useSsl?: boolean; } | undefined | null;

    // A list of peers, to select as peer, in settings
    defaultPeers?: { host: string; port: number; useSsl?: boolean; }[];

    // Enable cache persistence ?
    persistCache?: boolean;
}
