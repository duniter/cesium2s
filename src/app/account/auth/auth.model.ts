import { AppEvent } from '@app/shared/types';
import { InjectionToken } from '@angular/core';
import { ScryptParams } from '@app/account/crypto.utils';
import { Account, AccountMeta, LoginMethodType, LoginOptions, SelectAccountOptions, UnlockOptions } from '@app/account/account.model';

export interface IAuthController {
  selectLoginMethod(event?: AppEvent, opts?: { auth?: boolean }): Promise<LoginMethodType>;

  login(event?: AppEvent, opts?: LoginOptions): Promise<Account>;

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
