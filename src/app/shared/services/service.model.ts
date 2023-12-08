import {
  getPropertyByPathAsString,
  isNotNil,
  isNotNilOrBlank,
  matchUpperCase,
  startsWithUpperCase,
} from '../functions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type ReadyAsyncFunction<T = any> = () => Promise<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare interface IWithReadyService<T = any> {
  ready: ReadyAsyncFunction<T>;
}

export declare type FetchMoreFn<R, V = object> = (variables?: V) => Promise<R>;

export declare interface LoadResult<T> {
  data: T[];
  total?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any[];
  fetchMore?: FetchMoreFn<LoadResult<T>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function suggestFromArray<T = any>(
  values: T[],
  input: string | T,
  opts?: {
    offset?: 0;
    size?: 0;
    searchAttribute?: string;
    searchAttributes?: string[];
  }
): LoadResult<T> {
  if (isNotNil(input) && typeof input === 'object') return { data: [input] };

  let searchText = (typeof input === 'string' && input !== '*' && input.toUpperCase()) || undefined;

  // Filter items
  if (isNotNilOrBlank(searchText) && values) {
    const keys = (opts && ((opts.searchAttribute && [opts.searchAttribute]) || opts.searchAttributes)) || ['label'];

    // If wildcard, search using regexp
    if ((searchText as string).indexOf('*') !== -1) {
      searchText = (searchText as string).replace('*', '.*');
      values = values.filter(
        (v) => keys.findIndex((key) => matchUpperCase(getPropertyByPathAsString(v, key), searchText)) !== -1
      );
    } else {
      // If wildcard, search using startsWith
      values = values.filter(
        (v) => keys.findIndex((key) => startsWithUpperCase(getPropertyByPathAsString(v, key), searchText)) !== -1
      );
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
    total,
  };
}

export interface IStartableService<T> {
  started: boolean;

  start(): Promise<T>;

  stop(): Promise<void>;

  ready(): Promise<T>;
}
