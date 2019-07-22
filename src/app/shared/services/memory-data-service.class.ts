import {BehaviorSubject, Observable} from "rxjs-compat";
import {Entity, LoadResult, TableDataService} from "../../core/core.module";
import {EntityUtils} from "../../core/services/model";
import {mergeMap} from "rxjs/operators";

export interface InMemoryTableDataServiceOptions<T> {
  onSort?: (data: T[], sortBy?: string, sortDirection?: string) => T[];
  onLoad?: (data: T[]) => T[] | Promise<T[]>;
  onSave?: (data: T[]) => T[] | Promise<T[]>;
}

export class InMemoryTableDataService<T extends Entity<T>, F = any> implements TableDataService<T, F> {

  private _dataSubject = new BehaviorSubject<LoadResult<T>>(undefined);

  private readonly _sortFn: (data: T[], sortBy?: string, sortDirection?: string) => T[];
  private readonly _onLoad: (data: T[]) => T[] | Promise<T[]>;
  private readonly _onSaveFn: (data: T[]) => T[] | Promise<T[]>;

  protected data: T[];

  hasRankOrder = false;
  debug = false;
  dirty = false;

  set value(data: T[]) {
    if (this.data !== data) {
      this.data = data;
      if (this._dataSubject.observers.length) {
        this._dataSubject.next({data: data || [], total: data && data.length || 0});
      }
    }
    this.dirty = false;
  }

  get value(): T[] {
    return this.data;
  }

  constructor(
    protected dataType: new() => T,
    protected options?: InMemoryTableDataServiceOptions<T>
  ) {

    this._sortFn = options && options.onSort || this.sort;
    this._onLoad = options && options.onLoad || null;
    this._onSaveFn = options && options.onSave || null;

    // Detect rankOrder on the entity class
    this.hasRankOrder = Object.getOwnPropertyNames(new dataType()).findIndex(key => key === 'rankOrder') !== -1;
  }

  watchAll(
    offset: number,
    size: number,
    sortBy?: string,
    sortDirection?: string,
    filter?: F,
    options?: any
  ): Observable<LoadResult<T>> {

    if (!this.data) {
      console.warn("[memory-data-service] Waiting value to be set...");
    } else {
      // /!\ Always create a copy of the original array
      // Because datasource will only update if the array changed
      this.data = this.data.slice(0);

      this._dataSubject.next({
        data: this.data,
        total: this.data.length
      });
    }

    return this._dataSubject
      .pipe(
        mergeMap(async (res) => {
          // Apply sort
          let data = this._sortFn(res && res.data || [], sortBy, sortDirection) ;

          if (this._onLoad) {
            const promiseOrData = this._onLoad(data);
            data = ((promiseOrData instanceof Promise)) ? await promiseOrData : promiseOrData;
          }

          return {
            data,
            total: res && res.total || data.length
          };
        })
      );
  }

  async saveAll(data: T[], options?: any): Promise<T[]> {
    if (!this.data) throw new Error("[memory-service] Could not save, because value not set");

    if (this._onSaveFn) {
      const res = this._onSaveFn(data);
      data = ((res instanceof Promise)) ? await res : res;
    }

    this.data = data;
    this.dirty = true;
    return this.data;
  }

  async deleteAll(data: T[], options?: any): Promise<any> {
    if (!this.data) throw new Error("[memory-service] Could not delete, because value not set");

    // Remove deleted item, from data
    this.data = this.data.reduce((res, item) => {
      const keep = data.findIndex(i => item.equals(i)) === -1;
      return keep ? res.concat(item) : res;
    }, []);
    this.dirty = true;
  }

  sort(data: T[], sortBy?: string, sortDirection?: string): T[] {
    // Replace id with rankOrder
    sortBy = this.hasRankOrder && (!sortBy || sortBy === 'id') ? 'rankOrder' : sortBy || 'id';

    // Execute the sort
    return EntityUtils.sort(data, sortBy, sortDirection);
  }

  connect(): Observable<LoadResult<T>> {
    return this._dataSubject.asObservable();
  }
}

