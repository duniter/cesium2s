export interface Currency {
  network: string;
  displayName: string;
  symbol: string;
  prefix: number;
  genesis: string;
  fees: {
    identity: number;
    tx: number;
  },
  decimals: number;
}
