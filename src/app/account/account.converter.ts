import { LightAccountFragment, LightIdentityFragment } from '@app/network/indexer-types.generated';
import { Account, parseAddressSquid } from '@app/account/account.model';
import { isNotNil } from '@app/shared/functions';

export class AccountConverter {
  static toAccounts(inputs: LightAccountFragment[], debug?: boolean): Account[] {
    const results = (inputs || []).map(this.toAccount);
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toAccount(input: LightAccountFragment): Account {
    if (!input) return undefined;
    const addressSquid = parseAddressSquid(input.id);
    return <Account>{
      address: addressSquid.address,
      meta: {
        uid: input.identity?.name,
        isMember: input.identity?.membershipHistory?.some((h) => isNotNil(h.id)) || false,
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
    if (!input) return undefined;
    return <Account>{
      address: input.accountId,
      meta: {
        uid: input.name,
        isMember: input.membershipHistory?.some((h) => isNotNil(h.id)) || false,
      },
    };
  }
}
