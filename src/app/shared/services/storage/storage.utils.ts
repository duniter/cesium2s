import {InjectionToken} from "@angular/core";
import {Drivers} from "@ionic/storage";
import * as LocalForage from "localforage";


export interface IStorage<T = any> {
  readonly driver: string;
  ready(): Promise<T>
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
  remove(key: string): Promise<void>
  keys(): Promise<string[]>;
  clear(): Promise<void>;
  forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any): Promise<void>;
}

export const StorageDrivers = {
  //SQLLite: CordovaSQLiteDriver._driver,
  SecureStorage: Drivers.SecureStorage,
  WebSQL: LocalForage.WEBSQL,
  IndexedDB: Drivers.IndexedDB,
  LocalStorage: Drivers.LocalStorage
};

export const APP_STORAGE = new InjectionToken<IStorage>('Storage');
