import { Moment } from 'moment/moment';
import { equals, isNil, isNilOrBlank } from '@app/shared/functions';
import { BlockBoolExp, BlockEdge } from '@app/network/indexer/indexer-types.generated';
import { fromDateISOString } from '@app/shared/dates';

export interface Block {
  id: string;
  height: number;
  hash: string;
  timestamp: Moment;
  callsCount: number;
  eventsCount: number;
  extrinsicsCount: number;
}

export class BlockConverter {
  static toBlocks(inputs: BlockEdge[], debug?: boolean): Block[] {
    const results = (inputs || []).map((item) => this.toBlock(item));
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toBlock(input: BlockEdge): Block {
    return <Block>{
      ...input.node,
      timestamp: fromDateISOString(input.node.timestamp),
    };
  }
}

export interface BlockSearchFilter {
  id?: string;
  height?: number;
  hash?: string;
  where?: BlockBoolExp;
}

export class BlockSearchFilterUtils {
  static isEquals(f1: BlockSearchFilter, f2: BlockSearchFilter) {
    return f1 === f2 || equals(f1, f2);
  }

  static isEmpty(filter: BlockSearchFilter) {
    return !filter || (isNil(filter.id) && isNil(filter.height) && isNilOrBlank(filter.hash));
  }
}
