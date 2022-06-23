import {Peer} from "@app/model/settings.model";

export interface Environment {
  name: string;
  version?: string;
  production: boolean;

  defaultPeers: Peer[];
}
