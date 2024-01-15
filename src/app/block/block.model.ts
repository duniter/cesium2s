import { Moment } from 'moment/moment';
import { equals, isNil, isNilOrBlank } from '@app/shared/functions';

export interface Block {
  id: string;
  height: number;
  hash: string;
  timestamp: Moment;
  callsCount: number;
  eventsCount: number;
  extrinsicsCount: number;
}

export interface BlockSearchFilter {
  id?: string;
  height: number;
  hash?: string;
}

export class BlockSearchFilterUtils {
  static isEquals(f1: BlockSearchFilter, f2: BlockSearchFilter) {
    return f1 === f2 || equals(f1, f2);
  }

  static isEmpty(filter: BlockSearchFilter) {
    return !filter || (isNil(filter.id) && isNil(filter.height) && isNilOrBlank(filter.hash));
  }
}
