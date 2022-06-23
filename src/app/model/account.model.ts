
export interface AccountMeta {
  name: string;
  source: string;
}
export interface Account {
  address: string;
}
export interface AccountWithMeta extends Account{
  meta: AccountMeta;
}
