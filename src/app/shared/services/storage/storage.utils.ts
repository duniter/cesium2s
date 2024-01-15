import { InjectionToken } from '@angular/core';
import { Drivers } from '@ionic/storage';
import * as LocalForage from 'localforage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IStorage<V = any> {
  readonly driver: string;
  set(key: string, value: V): Promise<void>;
  get(key: string): Promise<V>;
  remove(key: string): Promise<void>;
  keys(): Promise<string[]>;
  clear(): Promise<void>;
  forEach(iteratorCallback: (value: V, key: string, iterationNumber: Number) => V): Promise<void>;
}

export const StorageDrivers = {
  SecureStorage: Drivers.SecureStorage,
  WebSQL: LocalForage.WEBSQL,
  IndexedDB: Drivers.IndexedDB,
  LocalStorage: Drivers.LocalStorage,
};

export const APP_STORAGE = new InjectionToken<IStorage>('Storage');
