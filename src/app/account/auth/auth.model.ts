import { AccountMeta } from '@app/account/account.model';

export interface AuthData {
  address?: string;
  password?: string;

  v1?: {
    salt: string;
    password: string;
  };

  v2?: {
    mnemonic: string;
  };

  meta?: AccountMeta;
}
