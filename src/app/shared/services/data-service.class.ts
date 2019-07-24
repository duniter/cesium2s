import {Observable} from "rxjs-compat";
import {FetchPolicy} from "apollo-client";
import {FetchOptions, sort} from "../shared.module";

export declare interface LoadResult<T> {
  data: T[];
  total?: number;
}
export declare type SortDirection = 'asc' | 'desc';

export declare interface Page {
  offset?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}
export declare interface Pageable {
  page?: Page;
}
export declare interface FetchOptions extends Pageable{
  fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';
}
export declare interface WatchFetchOptions extends Pageable {
  fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby' | 'cache-and-network';
}

export function sliceResult<T>(res: T[], options?: Pageable): LoadResult<T> {
  console.log('TODO: Check result', options);
  res = res || [];
  const page = options && options.page;
  if (!page) {
    return {
      data: res,
      total: res.length
    };
  }

  // Sort
  if (page.sortBy) {
    res = sort(res, page.sortBy);
    if (page.sortDirection === 'desc') {
      res.reverse();
    }
  }
  options.page.offset = options.page.offset || 0;

  // Cut slice
  const endIndex = options.page.offset + (options.page.size || 20);
  if (endIndex > res.length - 1) {
    return {
      data: res.slice(options.page.offset),
      total: res.length
    };
  }
  return {
    data: res.slice(options.page.offset, endIndex),
    total: res.length
  };
}


export declare interface SuggestionDataService<T, F = any> {
  suggest(value: any, options?: F): Promise<T[]>;
}

export declare interface DataService<T, F> {

  loadAll(
    offset: number,
    size: number,
    sortBy?: string,
    sortDirection?: string,
    filter?: F,
    options?: any
  ): Promise<LoadResult<T>>;

  saveAll?: (data: T[], options?: any) => Promise<T[]>;

  deleteAll?: (data: T[], options?: any) => Promise<any>;
}

export interface EditorDataServiceLoadOptions {
  fetchPolicy?: FetchPolicy;
  [key: string]: any;
}

export declare interface EditorDataService<T, F, O = EditorDataServiceLoadOptions> {

  load(
    id: number,
    options?: O
  ): Promise<T>;

  save(data: T, options?: any): Promise<T>;

  delete(data: T, options?: any): Promise<any>;

  listenChanges(id: number, options?: any): Observable<T | undefined>;
}

export declare interface TableDataService<T, F> {

  watchAll(
    offset: number,
    size: number,
    sortBy?: string,
    sortDirection?: SortDirection,
    filter?: F,
    options?: any
  ): Observable<LoadResult<T>>;

  saveAll?: (data: T[], options?: any) => Promise<T[]>;

  deleteAll?: (data: T[], options?: any) => Promise<any>;
}


