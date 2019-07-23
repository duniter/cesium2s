import {Entity} from "../model";


export declare interface Source extends Entity<Source> {
  type: String;
  noffset: number;
  identifier: string;
  amount: number;
  base: number;
  conditions: string;
  consumed: boolean;
}

export declare interface PendingIdentity extends Entity<PendingIdentity> {
  uid: string;
  pubkey: string;
}

export declare interface Identity extends Entity<Identity> {
  uid: string;
  pubkey: string;
}
