import { PropertiesMap, Property } from '../shared/types';
import { InjectionToken } from '@angular/core';

export declare interface LocaleConfig extends Property {
  country?: string;
}

export const APP_LOCALES = new InjectionToken<LocaleConfig[]>('locales');

export declare interface Settings {
  peer: string;
  currency?: string;
  preferredPeers?: string[];
  pages?: any;
  locale?: string;
  mobile?: boolean;
  properties?: PropertiesMap;
  unAuthDelayMs?: number;
  darkMode: boolean;
}
