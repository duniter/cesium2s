import {AccountMeta} from "@app/wallet/account.model";

export interface AuthData {

  phrase?: string;
  meta?: AccountMeta;

  v1?: {
    salt: string;
    password: string;
  }
}
