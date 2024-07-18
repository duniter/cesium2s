import { equals, isNil, isNilOrBlank } from '@app/shared/functions';
import { PredefinedColors } from '@app/shared/colors/colors.utils';
import { InjectionToken } from '@angular/core';
import { WotController } from './wot.controller';

export interface WotLookupOptions {
  debounceTime?: number;
  showToolbar?: boolean;
  showSearchBar?: boolean;
  showItemActions?: boolean;
  showFilterButtons?: boolean;
  toolbarColor?: PredefinedColors;
  searchText?: string;
  filter?: WotSearchFilter;
}

export interface WotSearchFilter {
  address?: string;
  addresses?: string[];
  searchText?: string;
  last?: boolean;
  pending?: boolean;
  uid?: string;
}

export class WotSearchFilterUtils {
  static isEquals(f1: WotSearchFilter, f2: WotSearchFilter) {
    return f1 === f2 || equals(f1, f2);
  }

  static isEmpty(filter: WotSearchFilter) {
    return !filter || (isNilOrBlank(filter.searchText) && isNil(filter.last) && isNilOrBlank(filter.address));
  }
}

export const APP_WOT_CONTROLLER = new InjectionToken<WotController>('WotController');
