import { PropertiesMap, Property } from '../shared/types';
import { InjectionToken } from '@angular/core';

export declare interface LocaleConfig extends Property {
  country?: string;
}

export const APP_LOCALES = new InjectionToken<LocaleConfig[]>('locales');

export type CurrencyDisplayUnit = 'base' | 'du';

export interface Settings {
  peer: string;
  currency?: string;
  preferredPeers?: string[];
  indexer: string;
  preferredIndexers?: string[];
  pod: string;
  preferredPods?: string[];
  ipfsGateway: string;
  preferredIpfsGateways?: string[];
  pages?: any;
  locale?: string;
  mobile?: boolean;
  properties?: PropertiesMap;
  unAuthDelayMs?: number;
  darkMode: boolean;
  displayUnit: CurrencyDisplayUnit;
}
