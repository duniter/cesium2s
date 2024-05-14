import { HexString } from '@polkadot/util/types';
import { Moment } from 'moment';

export interface Currency {
  network: string;
  displayName: string;
  symbol: string;
  ss58Format: number;
  genesis: HexString | null;
  startTime: Moment | string;
  powBase: number;
  fees: {
    identity: number;
    tx: number;
  };
  decimals: number;
  minBlockHeight?: number;
}
