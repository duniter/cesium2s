
export interface AccountMeta {
  name: string;
  source: string;
}

export interface AccountExtendedMeta {
  name?: string;
  uid?: string;
  avatar?: string;
  email?: string;
}

export interface Account {
  address: string;
}
export interface AccountWithMeta extends Account {
  meta: AccountMeta;
}


export interface UiAccount extends Account {
  free?: number;
  meta: AccountExtendedMeta;
}

export interface AccountData extends UiAccount {
}
