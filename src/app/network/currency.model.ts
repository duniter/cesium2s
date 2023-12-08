import { HexString } from '@polkadot/util/types';

export interface Currency {
  network: string;
  displayName: string;
  symbol: string;
  prefix: number;
  genesis: HexString | null;
  fees: {
    identity: number;
    tx: number;
  };
  decimals: number;
}
