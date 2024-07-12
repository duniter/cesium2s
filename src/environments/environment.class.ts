import { StorageConfig } from '@ionic/storage';
import { FetchPolicy } from '@apollo/client';
import { WatchQueryFetchPolicy } from '@apollo/client/core';
import { AuthData } from '@app/account/auth/auth.model';

export interface Environment {
  name: string;
  version?: string;
  production: boolean;

  // Default values
  baseUrl?: string;
  useHash?: boolean;
  defaultLocale: string;

  defaultPeers: string[];
  defaultIndexers: string[];
  defaultPods: string[];
  defaultIfpsGateways: string[];

  // GraphQL
  graphql: {
    fetchPolicy?: FetchPolicy;
    watchFetchPolicy?: WatchQueryFetchPolicy;
    persistCache?: boolean;
    fetchSize?: number;
  };

  // Storage
  storage?: Partial<StorageConfig>;

  keyring?: {
    // default address format (e.g. 42 for development)
    ss58Format: number;
  };

  // /!\ For DEV only
  dev?: {
    // Default peer
    peer?: string;
    indexer?: string;
    pod?: string;
    ipfsGateway?: string;

    // Load polkadot default account (alice, etc.)
    testingAccounts?: boolean;

    // Default authentication
    auth?: AuthData;
  };
}
