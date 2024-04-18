import { FetchMoreFn, LoadResult } from '@app/shared/services/service.model';

export declare type KeyType = string | number;
export declare type KeyValueType<T> = { [key in KeyType]: T };

export declare type KeysEnum<T> = { [P in keyof Required<T>]: boolean };

export declare interface ObjectMap<O> {
  [key: string]: O;
}

export declare interface ObjectMapEntry<O> {
  key: string;
  value?: O;
}

export declare type PropertiesMap = ObjectMap<string>;

export declare type Property = ObjectMapEntry<string>;

export declare type PropertiesArray = Property[];

export declare interface IconRef {
  icon?: string; // An ion-icon name
  matIcon?: string; // A mat icon
  matSvgIcon?: string; // A mat SVG icon
}

export interface SimpleError {
  code?: number;
  message: string;
}
export interface AppError extends SimpleError {
  details?: AppError;
}

export type AnyError = string | AppError;

export declare type AppEvent = MouseEvent | TouchEvent | PointerEvent | CustomEvent;

export interface ListItems<T, F> {
  first: number;
  filter: F;

  items: T[];
  count: number;
  canFetchMore: boolean;
  fetchMoreFn: FetchMoreFn<LoadResult<T>>;
}
