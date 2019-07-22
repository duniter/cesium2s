import {TableDataSource, TableElement, ValidatorService} from 'angular4-material-table';
import {Observable, Subject} from "rxjs";
import {isNotNil, LoadResult, TableDataService, toBoolean} from '../../shared/shared.module';
import {EventEmitter} from '@angular/core';
import {Entity} from "../services/model";
import {ErrorCodes} from '../services/errors';
import {catchError, first, map, takeUntil} from "rxjs/operators";

export interface AppTableDataSourceOptions<T extends Entity<T>> {
  prependNewElements: boolean;
  suppressErrors: boolean;
  onRowCreated?: (row: TableElement<T>) => Promise<void> | void;
  serviceOptions?: {
    saveOnlyDirtyRows?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

export class AppTableDataSource<T extends Entity<T>, F> extends TableDataSource<T> {

  protected _debug = false;
  protected _config: AppTableDataSourceOptions<T>;
  protected _creating = false;
  protected _saving = false;
  protected _useValidator = false;
  protected _onWatchAll = new Subject();

  public serviceOptions: any;
  public onLoading = new EventEmitter<boolean>();

  set dataService(value: TableDataService<T, F>) {
    this._dataService = value;
  }

  get dataService() {
    return this._dataService;
  }

  get options(): AppTableDataSourceOptions<T> {
    return this._config;
  }

  /**
   * Creates a new TableDataSource instance, that can be used as datasource of `@angular/cdk` data-table.
   * @param data Array containing the initial values for the TableDataSource. If not specified, then `dataType` must be specified.
   * @param _dataService A service to load and save data
   * @param dataType Type of data contained by the Table. If not specified, then `data` with at least one element must be specified.
   * @param validatorService Service that create instances of the FormGroup used to validate row fields.
   * @param config Additional configuration for table.
   */
  constructor(dataType: new() => T,
              private _dataService: TableDataService<T, F>,
              validatorService?: ValidatorService,
              config?: AppTableDataSourceOptions<T>) {
    super([], dataType, validatorService, config);
    this.serviceOptions = config && config.serviceOptions || {};
    this._config = config || {prependNewElements: false, suppressErrors: true};
    this._useValidator = isNotNil(validatorService);

    // For DEV ONLY
    //this._debug = !environment.production;
  }

  watchAll(offset: number,
           size: number,
           sortBy?: string,
           sortDirection?: string,
           filter?: F): Observable<LoadResult<T>> {

    this._onWatchAll.next();
    this.onLoading.emit(true);
    return this._dataService.watchAll(offset, size, sortBy, sortDirection, filter, this.serviceOptions)
      //.catch(err => this.handleError(err, 'Unable to load rows'))
      .pipe(
        // Stop this pipe, on the next call of watchAll()
        takeUntil(this._onWatchAll),
        catchError(err => this.handleError(err, 'ERROR.LOAD_DATA_ERROR')),
        map(res => {
          if (this._saving) {
            console.error(`[table-datasource] Service ${this._dataService.constructor.name} sent data, while will saving... should skip ?`);
          } else {
            this.onLoading.emit(false);
            if (this._debug) console.debug(`[table-datasource] Service ${this._dataService.constructor.name} sent new data: updating datasource...`, res);
            this.updateDatasource(res.data);
          }
          return res;
        })
      );
  }

  async save(): Promise<boolean> {
    if (this._saving) {
      console.error("[table-datasource] Trying to save twice. Should never occur !");
      return false;
    }

    this._saving = true;
    this.onLoading.emit(true);

    const onlyDirtyRows = toBoolean(this.serviceOptions.saveOnlyDirtyRows, false);

    try {
      if (this._debug) console.debug(`[table-datasource] Saving rows... (onlyDirty=${onlyDirtyRows})`);

      // Get all rows
      const rows = await this.getRows();

      // Finish editing all rows, and log row in error
      const invalidRows = rows.filter(row => row.editing && !row.confirmEditCreate());
      if (invalidRows.length) {
        // log errors
        if (this._debug) invalidRows.forEach(this.logRowErrors);
        // Stop with an error
        throw {code: ErrorCodes.TABLE_INVALID_ROW_ERROR, message: 'ERROR.TABLE_INVALID_ROW_ERROR'};
      }

      let data: T[];
      let dataToSave: T[];

      if (this._useValidator) {
        dataToSave = [];
        data = rows.map(row => {
          const currentData = new this.dataConstructor().fromObject(row.currentData) as T;
          // Filter to keep only dirty row
          if (onlyDirtyRows && row.validator.dirty) dataToSave.push(currentData);
          return currentData;
        });
        if (!onlyDirtyRows) dataToSave = data;
      }
      // Or use the current data without conversion (when no validator service used)
      else {
        data = rows.map(row => row.currentData);
        // save all data, as we don't have any dirty marker
        dataToSave = data;
      }

      // If no data to save: exit
      if (onlyDirtyRows && !dataToSave.length) {
        if (this._debug) console.debug('[table-datasource] No row to save');
        return false;
      }

      if (this._debug) console.debug('[table-datasource] Row to save:', dataToSave);

      const savedData = await this._dataService.saveAll(dataToSave, this.serviceOptions);

      if (this._debug) console.debug('[table-datasource] Data saved. Updated data received by service:', savedData);
      if (this._debug) console.debug('[table-datasource] Updating datasource...', data);
      this.updateDatasource(data, {emitEvent: false});
      return true;
    } catch (error) {
      if (this._debug) console.error('[table-datasource] Error while saving: ' + error && error.message || error);
      throw error;
    } finally {
      this._saving = false;
      // Always update the loading indicator
      this.onLoading.emit(false);
    }
  }

  // Overwrite default signature
  createNew(): void {
    this.asyncCreateNew();
  }

  confirmCreate(row: TableElement<T>) {
    if (row.validator && row.validator.valid && row.validator.dirty) {
      row.validator.patchValue({dirty: true});
    }
    return super.confirmCreate(row);
  }

  confirmEdit(row: TableElement<T>) {
    if (row.validator && row.validator.valid && row.validator.dirty) {
      row.validator.patchValue({dirty: true});
    }
    return super.confirmEdit(row);
  }

  startEdit(row: TableElement<T>) {
    if (this._debug) console.debug("[table-datasource] Start to edit row", row);
    row.startEdit();
  }

  cancelOrDelete(row: TableElement<T>) {
    if (this._debug) console.debug("[table-datasource] Cancelling or deleting row", row);
    row.cancelOrDelete();
  }

  public handleError(error: any, message: string): Observable<LoadResult<T>> {
    const errorMsg = error && error.message || error;
    console.error(`${errorMsg} (dataService: ${this._dataService.constructor.name})`, error);
    this.onLoading.emit(false);
    throw new Error(message || errorMsg);
  }

  public handleErrorPromise(error: any, message: string) {
    const errorMsg = error && error.message || error;
    console.error(`${errorMsg} (dataService: ${this._dataService.constructor.name})`, error);
    this.onLoading.emit(false);
    throw new Error(message || errorMsg);
  }

  public delete(id: number): void {
    const row = this.getRow(id);
    this.onLoading.emit(true);

    this._dataService.deleteAll([row.currentData], this.serviceOptions)
      .catch(err => this.handleErrorPromise(err, 'Unable to delete row'))
      .then(() => {
        setTimeout(() => {
          // make sure row has been deleted (because GrapQHl cache remove can failed)
          const present = this.getRow(id) === row;
          if (present) super.delete(id);
          this.onLoading.emit(false);
        }, 300);
      });
  }

  public deleteAll(rows: TableElement<T>[]): Promise<any> {
    this.onLoading.emit(true);

    const data = rows.map(r => r.currentData);
    const rowsById = rows.reduce((res, row) => {
      res[row.id] = row;
      return res;
    }, {});
    const self = this;
    const selfDelete = super.delete;

    return this._dataService.deleteAll(data, this.serviceOptions)
      .catch(err => this.handleErrorPromise(err, 'Unable to delete row'))
      .then(() => {
        // make sure row has been deleted (because GrapQHl cache remove can failed)
        const rowNotDeleted = Object.getOwnPropertyNames(rowsById).reduce((res, id) => {
          const row = rowsById[id];
          const present = self.getRow(+id) === row;
          return present ? res.concat(row) : res;
        }, []).sort((a, b) => a.id > b.id ? -1 : 1);
        rowNotDeleted.forEach(r => selfDelete.call(self, r.id));
        this.onLoading.emit(false);
      });
  }

  public getRows(): Promise<TableElement<T>[]> {
    return this.connect().pipe(first()).toPromise();
  }

  public async asyncCreateNew(): Promise<void> {
    if (this._creating) return; // Avoid multiple call
    this._creating = true;
    super.createNew();
    const row = this.getRow(-1);

    if (row && this._config && this._config.onRowCreated) {
      const res = this._config.onRowCreated(row);
      // If async function, wait the end before ending
      if (res instanceof Promise) {
        try {
          await res;
        }
        catch(err)  {
          console.error(err && err.message | err, err);
        }
      }
    }

    this._creating = false;
  }

  /* -- protected method -- */

  protected logRowErrors(row: TableElement<T>): void {

    if (!row.validator || !row.validator.hasError) return;

    let errorsMessage = "";
    Object.getOwnPropertyNames(row.validator.controls)
      .forEach(key => {
        let control = row.validator.controls[key];
        if (control.invalid) {
          errorsMessage += "'" + key + "' (" + (control.errors ? Object.getOwnPropertyNames(control.errors) : 'unknown error') + "),";
        }
      });

    if (errorsMessage.length) {
      console.error("[table-datasource] Row (id=" + row.id + ") has errors: " + errorsMessage.slice(0, -1));
    }
  }
}
