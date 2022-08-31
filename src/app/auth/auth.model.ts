import {AccountMeta} from "@app/wallet/account.model";

export interface AuthData {

  address?: string;
  password?: string;

  v1?: {
    salt: string;
    password: string;
  }

  meta?: AccountMeta;
}
