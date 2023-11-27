import {AccountMeta} from "@app/account/account.model";

export interface RegisterData {
  mnemonic: string;
  password?: string;

  meta?: AccountMeta;
}
