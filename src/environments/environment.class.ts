import { StorageConfig } from '@ionic/storage';
import { AuthData } from '@app/account/account.model';

export interface Environment {
  name: string;
  version?: string;
  production: boolean;

  // Default values
  baseUrl?: string;
  defaultLocale: string;
  defaultPeers: string[];

  // Storage
  storage?: Partial<StorageConfig>;

  keyring: {
    // default address format (e.g. 42 for development)
    ss58Format: number;
  };

  // /!\ For DEV only
  dev: {
    // Default peer
    peer?: string;

    // Load polkadot default account (alice, etc.)
    testingAccounts?: boolean;

    // Default authentication
    auth?: AuthData;
  };
}
