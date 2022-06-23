import {getPropertyByPathAsString, isNotNil, isNotNilOrBlank, matchUpperCase, startsWithUpperCase} from "./functions";

export declare type EmptyObject = {
  [key: string]: any;
};

export declare type FetchMoreFn<R, V = EmptyObject> = (variables?: V) => Promise<R>;

export declare interface LoadResult<T> {
  data: T[];
  total?: number;
  errors?: any[];
  fetchMore?: FetchMoreFn<LoadResult<T>>;
}

export function suggestFromArray<T = any>(values: T[], searchText: any, opts?: {
  offset?: 0;
  size?: 0;
  searchAttribute?: string;
  searchAttributes?: string[];
}): LoadResult<T> {
  if (isNotNil(searchText) && typeof searchText === 'object') return {data: [searchText]};

  searchText = (typeof searchText === 'string' && searchText !== '*') && searchText.toUpperCase() || undefined;

  // Filter items
  if (isNotNilOrBlank(searchText) && values) {
    const keys = opts && (opts.searchAttribute && [opts.searchAttribute] || opts.searchAttributes) || ['label'];

    // If wildcard, search using regexp
    let filteredItems: T[];
    if ((searchText as string).indexOf('*') !== -1) {
      searchText = (searchText as string).replace('*', '.*');
      values = values.filter(v => keys.findIndex(key => matchUpperCase(getPropertyByPathAsString(v, key), searchText)) !== -1);
    } else {
      // If wildcard, search using startsWith
      values = values.filter(v => keys.findIndex(key => startsWithUpperCase(getPropertyByPathAsString(v, key), searchText)) !== -1);
    }
  }

  // Truncate if need
  const total = values?.length || 0;
  if (opts) {
    if (opts.offset > 0) {
      values = values.slice(opts.offset);
    }
    if (isNotNil(opts.size)) {
      values = values.slice(0, opts.size);
    }
  }

  return {
    data: values,
    total
  };


}
