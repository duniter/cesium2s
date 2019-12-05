import {IEntity} from "../model";
import {exact, match} from "../../../shared/shared.module";


export declare interface BlockchainParameters extends IEntity {
  currency: string;
  c: number;
  dt: number;
  ud0: number;
  sigPeriod: number;
  sigReplay: number;
  sigStock: number;
  sigWindow: number;
  sigValidity: number;
  sigQty: number;
  idtyWindow: number;
  msWindow: number;
  msPeriod: number;
  xpercent: number;
  msValidity: number;
  stepMax: number;
  medianTimeBlocks: number;
  avgGenTime: number;
  dtDiffEval: number;
  percentRot: number;
  udTime0: number;
  udReevalTime0: number;
  dtReeval: number;
}

export declare interface Source extends IEntity {
  type: String;
  noffset: number;
  identifier: string;
  amount: number;
  base: number;
  conditions: string;
  consumed: boolean;
}

export declare interface PendingIdentity extends IEntity {
  uid: string;
  pubkey: string;
}

export declare interface Identity extends IEntity {
  uid: string;
  pubkey: string;
}

export interface NodeSummary {
  software: string;
  version: string;
  forkWindowSize: number;
}
