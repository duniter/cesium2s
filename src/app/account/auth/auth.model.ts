import { AppEvent } from '@app/shared/types';
import { InjectionToken } from '@angular/core';
import { ScryptParams } from '@app/account/crypto.utils';
import { Account, AccountMeta, LoginOptions, SelectAccountOptions, UnlockOptions } from '@app/account/account.model';

export interface IAuthController {
  login(event?: AppEvent, opts?: LoginOptions): Promise<Account>;

  changeMethod(event?: AppEvent, opts?: LoginOptions): Promise<void>;

  createNew(opts?: { redirectToWalletPage?: boolean }): Promise<Account>;

  unlock(opts?: UnlockOptions): Promise<string>;

  selectAccount(opts?: SelectAccountOptions): Promise<Account>;
}

export const APP_AUTH_CONTROLLER = new InjectionToken<IAuthController>('AuthController');

export interface AuthData {
  address?: string;
  password?: string;

  v1?: {
    salt: string;
    password: string;
    scryptParams?: ScryptParams;
  };

  v2?: {
    mnemonic: string;
  };

  meta?: AccountMeta;
}
