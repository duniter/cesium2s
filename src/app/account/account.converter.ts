import { LightAccountFragment, LightIdentityFragment } from '@app/network/indexer-types.generated';
import { Account } from '@app/account/account.model';
import { isNotNil } from '@app/shared/functions';

export class AccountConverter {
  static toAccounts(inputs: LightAccountFragment[], debug?: boolean): Account[] {
    const results = (inputs || []).map(this.toAccount);
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toAccount(input: LightAccountFragment): Account {
    return <Account>{
      address: input.id,
      meta: {
        uid: input.identity?.name,
        isMember: isNotNil(input.identity?.membership?.id),
      },
    };
  }
}

export class IdentityConverter {
  static toAccounts(inputs: LightIdentityFragment[], debug?: boolean): Account[] {
    const results = (inputs || []).map(this.toAccount);
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toAccount(input: LightIdentityFragment): Account {
    return <Account>{
      address: input.id,
      meta: {
        uid: input.name,
        isMember: isNotNil(input.membership?.id),
      },
    };
  }
}
