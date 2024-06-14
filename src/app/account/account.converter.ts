import { LightAccountConnectionFragment, LightAccountFragment, LightIdentityFragment } from '@app/network/indexer-types.generated';
import { Account, parseAddressSquid } from '@app/account/account.model';

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
    const identity = input.identity;
    return <Account>{
      address: addressSquid.address,
      meta: {
        id: identity?.id,
        index: identity?.index,
        uid: identity?.name,
        status: identity?.status,
        isMember: identity?.isMember || false,
        createdOn: identity?.createdOn,
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
        status: input?.status,
        isMember: input.isMember || false,
      },
    };
  }
}
