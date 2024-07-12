import { getPropertyByPathAsString, isNotNil, isNotNilOrBlank, matchUpperCase, startsWithUpperCase } from '../functions';
import { Promise } from '@rx-angular/cdk/zone-less/browser';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type ReadyAsyncFunction<T = any> = () => Promise<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare interface IWithReadyService<T = any> {
  ready: ReadyAsyncFunction<T>;
}

export declare type FetchMoreFn<R> = (limit?: number) => Promise<R>;

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
      values = values.filter((v) => keys.findIndex((key) => matchUpperCase(getPropertyByPathAsString(v, key), searchText)) !== -1);
    } else {
      // If wildcard, search using startsWith
      values = values.filter((v) => keys.findIndex((key) => startsWithUpperCase(getPropertyByPathAsString(v, key), searchText)) !== -1);
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

export function combineLoadResults<T>(
  results: LoadResult<T>[],
  options?: {
    reduce: (value: T[]) => T[];
    data?: T[];
    total?: number;
  }
): LoadResult<T> {
  let data = options?.data || [];
  const offset = data?.length || 0;

  // Compute data
  data = data.concat(results.map((r) => r?.data || []).flat());

  // Reduce (e.g. remove duplicated)
  if (typeof options?.reduce === 'function') {
    data = options.reduce(data);
  }

  // Truncate data
  const newData = offset > 0 ? data.slice(offset) : data;

  // Compute total
  let total = isNotNil(options?.total)
    ? options.total
    : results
        .map((r) => r?.total)
        .filter(isNotNil)
        .reduce((max, total) => Math.max(max || 0, total), -1);
  if (total === -1) total = undefined;

  // Compute fetch more
  const fetchMoreFns = results.map((r) => r?.fetchMore).filter(isNotNil);
  const fetchMore = combineFetchMore(fetchMoreFns, { ...options, data, total });

  return { data: newData, total, fetchMore };
}

export function combineFetchMore<T>(
  fetchMoreFns: FetchMoreFn<LoadResult<T>>[],
  options?: {
    reduce: (value: T[]) => T[];
    data?: T[];
    total?: number;
  }
): FetchMoreFn<LoadResult<T>> {
  if (!fetchMoreFns?.length || (options?.data && !options.data.length)) return undefined;
  return async (first) => {
    const results = await Promise.all(fetchMoreFns.map((fetchMoreFn) => fetchMoreFn(first)));
    return combineLoadResults(results, options);
  };
}

export interface IStartableService<T> {
  started: boolean;

  start(): Promise<T>;

  stop(): Promise<void>;

  ready(): Promise<T>;
}
