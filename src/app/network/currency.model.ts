export interface Currency {
  name: string;
  symbol: string;
  ss58Format: number;
  genesys: string;
  fees: {
    identity: number;
    tx: number;
  },
  decimals: number;
}
