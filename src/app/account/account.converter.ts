import { LightAccountConnectionFragment, LightAccountFragment, LightIdentityFragment } from '@app/network/indexer/indexer-types.generated';
import { Account, parseAddressSquid } from '@app/account/account.model';
import { ProfileFragment } from '@app/network/pod/pod-types.generated';

export class AccountConverter {
  static squidConnectionToAccounts(accountConnection: LightAccountConnectionFragment, debug?: boolean): Account[] {
    const inputs = accountConnection.edges?.map((edge) => edge.node) as LightAccountFragment[];
    const results = (inputs || []).map(this.squidToAccount);
    if (debug) console.debug('Results:', results);
    return results;
  }

  static squidToAccounts(inputs: LightAccountFragment[], debug?: boolean): Account[] {
    const results = (inputs || []).map(this.squidToAccount);
    if (debug) console.debug('Results:', results);
    return results;
  }

  static squidToAccount(input: LightAccountFragment): Account {
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

  static profileToAccounts(inputs: ProfileFragment[], opts?: { debug?: boolean; ipfsGateway?: string }): Account[] {
    const results = (inputs || []).map((input) => this.profileToAccount(input, opts));
    if (opts?.debug) console.debug('Results:', results);
    return results;
  }

  static profileToAccount(input: ProfileFragment, opts?: { ipfsGateway?: string }): Account {
    if (!input) return undefined;
    const avatar = input.avatar_cid && opts.ipfsGateway ? opts.ipfsGateway + input.avatar_cid : undefined;
    return <Account>{
      address: input.address,
      meta: {
        name: input.title,
        avatar,
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
