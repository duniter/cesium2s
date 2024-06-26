import { LightAccountConnectionFragment, LightAccountFragment, LightIdentityFragment } from '@app/network/indexer-types.generated';
import { Account, parseAddressSquid } from '@app/account/account.model';
import { isNotNil } from '@app/shared/functions';

export class AccountConverter {
  static connectionToAccounts(accountConnection: LightAccountConnectionFragment, debug?: boolean): Account[] {
    const inputs = accountConnection.edges?.map((edge) => edge.node) as LightAccountFragment[];
    const results = (inputs || []).map(this.toAccount);
    if (debug) console.debug('Results:', results);
    return results;
  }

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
        id: input.identity?.id,
        index: input.identity?.index,
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
        id: input.id,
        index: input.index,
        uid: input.name,
        isMember: input.membershipHistory?.some((h) => isNotNil(h.id)) || false,
      },
    };
  }
}
