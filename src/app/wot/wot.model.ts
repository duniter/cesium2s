import {equals, isNil, isNilOrBlank, isNotNilOrBlank} from "@app/shared/functions";

export interface WotSearchFilter {
  address?: string;
  text?: string;
  last?: boolean;
}


export class WotSearchFilterUtils {

  static isEquals(f1: WotSearchFilter, f2: WotSearchFilter) {
    return f1 === f2 || equals(f1, f2)
  }

  static isEmpty(filter: WotSearchFilter) {
    return !filter || (isNilOrBlank(filter.text) && isNil(filter.last) && isNotNilOrBlank(filter.address));
  }

}

