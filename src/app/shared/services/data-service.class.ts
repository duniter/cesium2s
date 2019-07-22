import {Observable} from "rxjs-compat";
import {FetchPolicy} from "apollo-client";

export declare interface LoadResult<T> {
  data: T[];
  total?: number;
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
    sortDirection?: string,
    filter?: F,
    options?: any
  ): Observable<LoadResult<T>>;

  saveAll?: (data: T[], options?: any) => Promise<T[]>;

  deleteAll?: (data: T[], options?: any) => Promise<any>;
}
