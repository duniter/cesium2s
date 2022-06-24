import {AccountExtendedMeta} from "@app/wallet/account.model";

export interface AuthData {
  username: string;
  password: string;

  phrase?: string;
  meta?: AccountExtendedMeta;
}
