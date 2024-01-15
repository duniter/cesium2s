import { LightAccountFragment, LightBlockFragment, TransferFragment } from './indexer-types.generated';
import { Account } from '@app/account/account.model';
import { isNotNil } from '@app/shared/functions';
import { fromDateISOString } from '@app/shared/dates';
import { Transfer } from '@app/transfer/transfer.model';
import { Block } from '@app/block/block.model';

export class IndexerFragmentConverter {
  static toAccounts(inputs: LightAccountFragment[], debug?: boolean): Account[] {
    const results = (inputs || []).map(IndexerFragmentConverter.toAccount);
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

  static toTransfers(accountAddress: string, inputs: TransferFragment[], debug?: boolean): Transfer[] {
    const results = (inputs || []).map((item) => this.toTransfer(accountAddress, item));
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toTransfer(accountAddress: string, item: TransferFragment): Transfer {
    let from: Account = null;
    let to: Account = null;
    let amount: number;
    // Account is the issuer
    if (item.from?.id === accountAddress) {
      to = this.toAccount(item.to);
      amount = -1 * item.amount;
    } else if (item.to?.id === accountAddress) {
      from = this.toAccount(item.from);
      amount = item.amount;
    }
    return <Transfer>{
      id: item.id,
      from,
      to,
      account: from || to,
      amount,
      blockNumber: item.blockNumber,
      timestamp: fromDateISOString(item.timestamp),
    };
  }

  static toBlocks(inputs: LightBlockFragment[], debug?: boolean): Block[] {
    const results = (inputs || []).map((item) => this.toBlock(item));
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toBlock(input: LightBlockFragment): Block {
    return <Block>{
      ...input,
      timestamp: fromDateISOString(input.timestamp),
    };
  }
}
