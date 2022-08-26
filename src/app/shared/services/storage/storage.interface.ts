import {InjectionToken} from "@angular/core";

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

export const APP_STORAGE = new InjectionToken<IStorage>('Storage');
