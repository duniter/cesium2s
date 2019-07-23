import {EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {MatColumnDef, MatPaginator, MatSort, MatTable} from "@angular/material";
import {merge} from "rxjs/observable/merge";
import {Observable, of, Subject} from 'rxjs';
import {catchError, filter, mergeMap, startWith, switchMap, takeUntil} from "rxjs/operators";
import {TableElement} from "angular4-material-table";
import {AppTableDataSource} from "./table-datasource.class";
import {SelectionModel} from "@angular/cdk/collections";
import {Entity} from "../services/model";
import {Subscription} from "rxjs-compat";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {TableSelectColumnsComponent} from './table-select-columns.component';
import {Location} from '@angular/common';
import {ErrorCodes} from "../services/errors";
import {AppFormUtils} from "../form/form.utils";
import {isNotNil} from "../../shared/shared.module";
import {LocalSettingsService} from "../services/local-settings.service";
import {TranslateService} from "@ngx-translate/core";
import {PlatformService} from "../services/platform.service";
import {DisplayFn, MatAutocompleteFieldConfig} from "../../shared/material/material.autocomplete";
import {SuggestionDataService} from "../../shared/services/data-service.class";

export const SETTINGS_DISPLAY_COLUMNS = "displayColumns";
export const DEFAULT_PAGE_SIZE = 20;
export const RESERVED_START_COLUMNS = ['select', 'id'];
export const RESERVED_END_COLUMNS = ['actions'];

export abstract class AppTable<T extends Entity<T>, F = any> implements OnInit, OnDestroy {

  private _initialized = false;
  private _subscriptions: Subscription[] = [];
  private _cellValueChangesDefs: {
    [key: string]: {
      eventEmitter: EventEmitter<any>;
      subscription: Subscription,
      formPath?: string;
    }
  } = {};
  protected autocompleteFields: {
    [key: string]: MatAutocompleteFieldConfig
  } = {};

  // TODO: change this to private:
  protected _implicitValues: { [key: string]: any } = {};
  protected _enable = true;
  protected _dirty = false;
  protected allowRowDetail = true;
  protected pageSize: number;
  protected _onDestroy = new Subject();

  excludesColumns = new Array<String>();
  inlineEdition: boolean;
  displayedColumns: string[];
  resultsLength = 0;
  loading = true;
  focusFirstColumn = false;
  error: string;
  showFilter = false;
  isRateLimitReached = false;
  selection = new SelectionModel<TableElement<T>>(true, []);
  editedRow: TableElement<T> = undefined;
  onRefresh = new EventEmitter<any>();
  i18nColumnPrefix = 'COMMON.';
  autoLoad = true;
  settingsId: string;
  mobile: boolean;
  confirmBeforeDelete = false;

  protected translate: TranslateService;
  protected alertCtrl: AlertController;

  @Input()
  debug = false;

  @Input() set filter(value: F) {
    this.setFilter(value);
  }

  get filter(): F {
    return this._filter;
  }

  @ViewChild(MatTable) table: MatTable<T>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output()
  listChange = new EventEmitter<T[]>();

  @Output()
  onOpenRow = new EventEmitter<{ id?: number; row: TableElement<T> }>(true);

  @Output()
  onNewRow: EventEmitter<void> = new EventEmitter<void>(true);

  @Output()
  get dirty(): boolean {
    return this._dirty;
  }

  @Output()
  get valid(): boolean {
    return this.editedRow && this.editedRow.editing ? (!this.editedRow.validator || this.editedRow.validator.valid) : true;
  }

  @Output()
  get invalid(): boolean {
    return this.editedRow && this.editedRow.editing ? (this.editedRow.validator && this.editedRow.validator.invalid) : false;
  }

  @Output()
  get pending(): boolean {
    return this.editedRow && this.editedRow.editing ? (this.editedRow.validator && this.editedRow.validator.pending) : false;
  }


  disable() {
    if (!this._initialized || !this.table) return;
    if (this.sort) this.sort.disabled = true;
    this._enable = false;
  }

  enable() {
    if (!this._initialized || !this.table) return;
    if (this.sort) this.sort.disabled = false;
    this._enable = true;
  }

  get enabled(): boolean {
    return this._enable;
  }

  get disabled(): boolean {
    return !this._enable;
  }

  markAsDirty() {
    this._dirty = true;
    this.markForCheck();
  }

  markAsPristine() {
    this._dirty = false;
    this.markForCheck();
  }

  markAsUntouched() {
    this._dirty = false;
    this.markForCheck();
  }

  markAsTouched() {
    if (this.editedRow && this.editedRow.editing) {
      this.editedRow.validator.markAsTouched();
      this.editedRow.validator.updateValueAndValidity();
      this.markForCheck();
    }
  }

  protected constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected platform: Platform | PlatformService,
    protected location: Location,
    protected modalCtrl: ModalController,
    protected settings: LocalSettingsService,
    protected columns: string[],
    public dataSource?: AppTableDataSource<T, F>,
    private _filter?: F,
    injector?: Injector
  ) {
    this.mobile = this.platform.is('mobile');
    this.inlineEdition = false;
    this.translate = injector && injector.get(TranslateService);
    this.alertCtrl = injector && injector.get(AlertController);
  }

  ngOnInit() {
    if (this._initialized) return; // Init only once
    this._initialized = true;

    if (!this.table) console.warn("[table] Missing <mat-table> in the HTML template!");

    // Defined unique id for settings
    this.settingsId = this.generateTableId();

    this.displayedColumns = this.getDisplayColumns();

    // If the user changes the sort order, reset back to the first page.
    this.sort && this.paginator && this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(
      this.sort && this.sort.sortChange
        .pipe(
          mergeMap(async () => {
            if (this._dirty && this.inlineEdition) {
              const saved = await this.save();
              this.markAsDirty(); // restore dirty flag
              return saved;
            }
            return true;
          }),
          filter(res => res === true)
        )
      || EventEmitter.empty(),
      this.paginator && this.paginator.page || EventEmitter.empty(),
      this.onRefresh
    )
      .pipe(
        startWith(this.autoLoad ? {} : 'skip'),
        switchMap(
          (any: any) => {
            this._dirty = false;
            this.selection.clear();
            this.editedRow = undefined;
            if (any === 'skip' || !this.dataSource) {
              return Observable.of(undefined);
            }
            if (!this.dataSource) {
              if (this.debug) console.debug("[table] Skipping data load: no dataSource defined");
              return Observable.of(undefined);
            }
            if (this.debug) console.debug("[table] Calling dataSource.watchAll()...");
            return this.dataSource.watchAll(
              this.paginator && this.paginator.pageIndex * this.paginator.pageSize,
              this.paginator && this.paginator.pageSize || this.pageSize || DEFAULT_PAGE_SIZE,
              this.sort && this.sort.active,
              this.sort && this.sort.direction,
              this._filter
            );
          }),
        takeUntil(this._onDestroy),
        catchError(err => {
          this.error = err && err.message || err;
          return of(undefined);
        })
      )
      .subscribe(res => {
        if (res && res.data) {
          this.isRateLimitReached = !this.paginator || (res.data.length < this.paginator.pageSize);
          this.resultsLength = isNotNil(res.total) ? res.total : ((this.paginator && this.paginator.pageIndex * (this.paginator.pageSize || DEFAULT_PAGE_SIZE) || 0) + res.data.length);
          if (this.debug) console.debug(`[table] ${res.data.length} rows loaded`);
        } else {
          if (this.debug) console.debug('[table] NO rows loaded');
          this.isRateLimitReached = true;
          this.resultsLength = 0;
        }
        this.markAsUntouched();
        this.markAsPristine();
        this.markForCheck();
      });

    // Listen datasource events
    if (this.dataSource) this.listenDatasource(this.dataSource);
  }

  ngOnDestroy() {
    if (this._subscriptions.length) {
      if (this.debug) console.debug(`[table] Deleting ${this._subscriptions.length} subscriptions ${this.constructor.name}#*`);
      this._subscriptions.forEach(s => s.unsubscribe());
      this._subscriptions = [];
    }

    // Unsubscribe column value changes
    Object.getOwnPropertyNames(this._cellValueChangesDefs)
      .forEach(col => this.stopCellValueChanges(col));
    this._cellValueChangesDefs = {};

    this._onDestroy.next();
  }

  setDatasource(datasource: AppTableDataSource<T, F>) {
    if (this.dataSource) throw new Error("[table] dataSource already set !");
    this.dataSource = datasource;
    if (this._initialized) this.listenDatasource(datasource);
  }

  setFilter(filter: F, opts?: { emitEvent: boolean }) {
    opts = opts || {emitEvent: true};
    this._filter = filter;
    if (opts.emitEvent) {
      this.onRefresh.emit();
    }
  }

  protected listenDatasource(dataSource: AppTableDataSource<T, F>) {
    if (!dataSource) throw new Error("[table] dataSource not set !");
    if (this._subscriptions.length) console.warn("Too many call of listenDatasource!", new Error());
    this.registerSubscription(dataSource.onLoading.subscribe(loading => {
      this.loading = loading;
      this.markForCheck();
    }));
    this.registerSubscription(dataSource.datasourceSubject.subscribe(data => {
      this.error = undefined;
      this.listChange.emit(data);
      // NOT NEED this.markForCheck();
    }));
  }

  addColumnDef(columnDef: MatColumnDef, options?: { skipIfExists: boolean; }) {
    const existingColumnDef = this.table._contentColumnDefs.find((item, index, array) => item.name === columnDef.name);
    if (existingColumnDef) {
      if (options && options.skipIfExists) return; // skip
      this.table.removeColumnDef(existingColumnDef);
    }
    this.table.addColumnDef(columnDef);
  }

  confirmAndAddRow(event?: any, row?: TableElement<T>): boolean {
    if (!this.confirmEditCreate(event, row)) {
      return false;
    }

    // Add row
    return this.addRow(event);
  }

  /**
   * Confirm the creation of the given row, or if not specified the currently edited row
   * @param event
   * @param row
   */
  confirmEditCreate(event?: any, row?: TableElement<T>): boolean {
    row = row || this.editedRow;
    if (row && row.editing) {
      if (event) event.stopPropagation();
      // confirmation edition or creation
      if (!row.confirmEditCreate()) {
        if (this.debug) console.warn("[table] Row not valid: unable to confirm", row);
        return false;
      }
      // If edit finished, forget edited row
      if (row === this.editedRow) {
        this.editedRow = undefined;
        this.markAsDirty();
      }
    }
    return true;
  }

  cancelOrDelete(event: any, row: TableElement<T>) {
    this.editedRow = undefined; // unselect row
    event.stopPropagation();

    this.dataSource.cancelOrDelete(row);

    // If delete (if new row): update counter
    if (row.id === -1) {
      this.resultsLength--;
    }
    //this.markForCheck();
  }

  addRow(event?: any): boolean {
    if (!this._enable) return false;
    if (this.debug) console.debug("[table] Asking for new row...");

    // Use modal if inline edition is disabled
    if (!this.inlineEdition) {
      this.openNewRowDetail();
      return false;
    }

    // Try to finish edited row first
    if (!this.confirmEditCreate()) {
      return false;
    }

    // Add new row
    this.addRowToTable();
    return true;
  }

  async save(): Promise<boolean> {
    this.error = undefined;
    if (!this.confirmEditCreate()) {
      throw {code: ErrorCodes.TABLE_INVALID_ROW_ERROR, message: 'ERROR.TABLE_INVALID_ROW_ERROR'};
    }
    if (this.debug) console.debug("[table] Calling dataSource.save()...");
    try {
      const res = await this.dataSource.save();
      if (res) this._dirty = false;
      return res;
    } catch (err) {
      if (this.debug) console.debug("[table] dataSource.save() return an error:", err);
      this.error = err && err.message || err;
      this.markForCheck();
      throw err;
    }
  }

  cancel() {
    this.onRefresh.emit();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    return this.selection.selected.length === this.resultsLength;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  async masterToggle() {
    if (this.loading) return;
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      const rows = await this.dataSource.getRows();
      rows.forEach(row => this.selection.select(row));
    }
  }

  async deleteSelection(confirm?: boolean): Promise<void> {
    if (!this._enable) return;
    if (this.loading || this.selection.isEmpty()) return;

    if (this.confirmBeforeDelete && !confirm) {
      const translations = this.translate.instant(['COMMON.YES', 'COMMON.NO', 'CONFIRM.DELETE', 'CONFIRM.ALERT_HEADER']);
      const alert = await this.alertCtrl.create({
        header: translations['CONFIRM.ALERT_HEADER'],
        message: translations['CONFIRM.DELETE'],
        buttons: [
          {
            text: translations['COMMON.NO'],
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          },
          {
            text: translations['COMMON.YES'],
            handler: () => {
              confirm = true; // update upper value
            }
          }
        ]
      });
      await alert.present();
      await alert.onDidDismiss();
      if (!confirm) return; // user cancelled

      // Loop, with confirmation
      return this.deleteSelection(true);
    }

    if (this.debug) console.debug("[table] Delete selection...");

    const rowsToDelete = this.selection.selected.slice()
    // Reverse row order
    // This is a workaround, need because row.delete() has async execution
    // and index cache is updated with a delay)
      .sort((a, b) => a.id > b.id ? -1 : 1);

    try {
      await this.dataSource.deleteAll(rowsToDelete);
      this.resultsLength -= rowsToDelete.length;
      this.selection.clear();
      this.editedRow = undefined;
      this.markForCheck();
    } catch (err) {
      this.error = err && err.message || err;
    }
  }

  onEditRow(event: MouseEvent, row: TableElement<T>): boolean {
    if (!this._enable) return false;
    if (this.editedRow === row || event.defaultPrevented) return;

    if (!this.confirmEditCreate()) {
      return false;
    }

    if (!row.editing && !this.loading) {
      this.dataSource.startEdit(row);
    }
    this.editedRow = row;
    this.startListenRow(row);
    this._dirty = true;
    return true;
  }

  clickRow(event: MouseEvent, row: TableElement<T>): boolean {
    if (row.id === -1 || row.editing) return true;
    if (event.defaultPrevented || this.loading) return false;

    // Open the detail page (if not inline editing)
    if (!this.inlineEdition) {
      if (this._dirty && this.debug) {
        console.warn("[table] Opening row details, but table has unsaved changes!");
      }

      event.stopPropagation();

      this.loading = true;
      setTimeout(async () => {
        await this.openRow(row.currentData.id, row);
        this.loading = false;
        this.markForCheck();
      });

      return true;
    }


    return this.onEditRow(event, row);
  }

  protected async openRow(id: number, row: TableElement<T>): Promise<boolean> {
    if (!this.allowRowDetail) return false;

    if (this.onOpenRow.observers.length) {
      this.onOpenRow.emit({id, row});
      return true;
    }

    return await this.router.navigate([id], {
      relativeTo: this.route
    });
  }

  protected async openNewRowDetail(): Promise<boolean> {
    if (!this.allowRowDetail) return false;

    if (this.onNewRow.observers.length) {
      this.onNewRow.emit();
      return true;
    }

    return await this.router.navigate(['new'], {
      relativeTo: this.route
    });
  }

  protected getDisplayColumns(): string[] {
    let userColumns = this.settings.getPageSettings(this.settingsId, SETTINGS_DISPLAY_COLUMNS);
    // No user override: use defaults
    if (!userColumns) return this.columns;

    // Get fixed start columns
    const fixedStartColumns = this.columns.filter(value => RESERVED_START_COLUMNS.includes(value));

    // Remove end columns
    const fixedEndColumns = this.columns.filter(value => RESERVED_END_COLUMNS.includes(value));

    // Remove fixed columns from user columns
    userColumns = userColumns.filter(value => (!fixedStartColumns.includes(value) && !fixedEndColumns.includes(value) && this.columns.includes(value)));
    return fixedStartColumns.concat(userColumns).concat(fixedEndColumns);
  }

  public async openSelectColumnsModal(event: any): Promise<any> {
    const fixedColumns = this.columns.slice(0, RESERVED_START_COLUMNS.length);
    const hiddenColumns = this.columns.slice(fixedColumns.length)
      .filter(name => this.displayedColumns.indexOf(name) == -1);
    const columns = this.displayedColumns.slice(fixedColumns.length)
      .concat(hiddenColumns)
      .filter(name => name !== "actions")
      .filter(name => !this.excludesColumns.includes(name))
      .map(name => {
        return {
          name,
          label: this.getI18nColumnName(name),
          visible: this.displayedColumns.indexOf(name) !== -1
        };
      });

    const modal = await this.modalCtrl.create({
      component: TableSelectColumnsComponent,
      componentProps: {columns: columns}
    });

    // On dismiss
    modal.onDidDismiss()
      .then(async res => {
        if (!res) return; // CANCELLED

        // Apply columns
        const userColumns = columns && columns.filter(c => c.visible).map(c => c.name) || [];
        this.displayedColumns = RESERVED_START_COLUMNS.concat(userColumns).concat(RESERVED_END_COLUMNS);
        this.markForCheck();

        // Update user settings
        await this.settings.savePageSetting(this.settingsId, userColumns, SETTINGS_DISPLAY_COLUMNS);
      });
    return modal.present();
  }


  public trackByFn(index: number, row: TableElement<T>) {
    return row.id;
  }

  /* -- protected method -- */

  protected registerSubscription(sub: Subscription) {
    this._subscriptions.push(sub);
    if (this.debug) console.debug(`[table] Registering a new subscription ${this.constructor.name}#${this._subscriptions.length}`);
  }

  protected registerAutocompleteField(fieldName: string, options?: {
    defaultAttributes?: string[];
    service?: SuggestionDataService<any>;
    filter?: any;
    displayWith?: DisplayFn;
    suggestFn?: (value: any, options?: any) => Promise<any[]>;
  }) : MatAutocompleteFieldConfig {
    options = options || {};
    if (this.debug) console.debug(`[table] Registering a autocomplete field ${this.constructor.name} ${fieldName}`);

    const service: SuggestionDataService<any> = options.service || (options.suggestFn && {
      suggest: (value: any, filter?: any) => options.suggestFn(value, filter)
    }) || undefined;
    const attributes = this.settings.getFieldAttributes(fieldName, options.defaultAttributes);
    const attributesOrFn = attributes.map((a, index) => a === "function" && options.defaultAttributes[index] || a);
    const filter =   Object.assign({
      searchAttribute: attributes.length === 1 ? attributes[0] : undefined
    }, options.filter || {});

    const config = {
      attributes: attributesOrFn,
      service,
      filter,
      displayWith: options.displayWith
    };
    this.autocompleteFields[fieldName] = config;
    return config;
  }

  protected getI18nColumnName(columnName: string) {
    return this.i18nColumnPrefix + columnName.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
  }

  protected generateTableId() {
    const id = this.location.path(true).replace(/[?].*$/g, '').replace(/\/[\d]+/g, '_id') + "_" + this.constructor.name;
    //if (this.debug) console.debug("[table] id = " + id);
    return id;
  }


  protected async addRowToTable(): Promise<TableElement<T>> {
    this.focusFirstColumn = true;
    await this.dataSource.asyncCreateNew();
    this.editedRow = this.dataSource.getRow(-1);
    // Listen row value changes
    this.startListenRow(this.editedRow);
    this._dirty = true;
    this.resultsLength++;
    this.markForCheck();
    return this.editedRow;
  }


  private logRowErrors(row: TableElement<T>): void {

    if (row.validator.valid) return;

    var errorsMessage = "";
    Object.getOwnPropertyNames(row.validator.controls)
      .forEach(key => {
        const control = row.validator.controls[key];
        if (control.invalid) {
          errorsMessage += "'" + key + "' (" + (control.errors ? Object.getOwnPropertyNames(control.errors) : 'unknown error') + "),";
        }
      });

    if (errorsMessage.length) {
      console.error(`[table] Row #${row.id} has errors: ${errorsMessage.slice(0, -1)})`, row);
    }
  }

  /**
   * Can be overwrite by subclasses
   **/
  protected startListenRow(row: TableElement<T>) {

  }

  protected registerCellValueChanges(name: string, formPath?: string): Observable<any> {
    formPath = formPath || name;
    if (this.debug) console.debug(`[table] New listener {${name}} for value changes on path ${formPath}`);
    this._cellValueChangesDefs[name] = this._cellValueChangesDefs[name] || {
      eventEmitter: new EventEmitter<any>(),
      subscription: null,
      formPath: formPath
    };

    return this._cellValueChangesDefs[name].eventEmitter
      //.pipe(
      //  distinctUntilChanged()
      //)
      ;
  }

  protected startCellValueChanges(name: string, row: TableElement<T>) {
    const def = this._cellValueChangesDefs[name];
    if (!def) {
      console.warn("[table] Listener with name {" + name + "} not registered! Please call registerCellValueChanges() before;");
      return;
    }
    // Stop previous subscription
    if (def.subscription) {
      def.subscription.unsubscribe();
      def.subscription = null;
    } else {
      if (this.debug) console.debug(`[table] Start values changes on row path {${def.formPath}}`);
    }

    // Listen value changes, and redirect to event emitter
    const control = AppFormUtils.getControlFromPath(row.validator, def.formPath);
    if (!control) {
      console.warn(`[table] Trying to listen cell changes, on an invalid row path {${def.formPath}}`);
    } else {
      def.subscription = control.valueChanges
        .subscribe((value) => {
          def.eventEmitter.emit(value);
        });

      // Emit the actual value
      def.eventEmitter.emit(control.value);
    }
  }

  protected stopCellValueChanges(name: string) {
    const def = this._cellValueChangesDefs[name];
    if (def && def.subscription) {
      if (this.debug) console.debug("[table] Stop value changes on row path {" + def.formPath + "}");
      def.subscription.unsubscribe();
      def.subscription = null;
    }
  }

  public updateImplicitValue(name: string, res: any[]) {
    this._implicitValues[name] = res && res.length === 1 ? res[0] : undefined;
  }

  public applyImplicitValue(columnName: string, row: TableElement<any>) {
    this.stopCellValueChanges(columnName);
    const control = row.validator && row.validator.controls[columnName];
    const value = control && this._implicitValues[name];
    // Apply last implicit value
    if (control && value !== undefined && value !== null) {
      control.patchValue(this._implicitValues[columnName], {emitEvent: false});
      control.markAsDirty();
      this._implicitValues[name] = null;
    }
  }

  onCellFocus(event: any, row: TableElement<T>, columnName: string) {
    this.startCellValueChanges(columnName, row);
  }

  onCellBlur(event: FocusEvent, row: TableElement<T>, columnName: string) {
    this.stopCellValueChanges(columnName);
    this.applyImplicitValue(columnName, row);
  }


  setShowColumn(columnName: string, show: boolean) {
    if (!this.excludesColumns.includes(columnName) !== show) {
      if (!show) {
        this.excludesColumns.push(columnName);
      } else {
        const index = this.excludesColumns.findIndex(value => value === columnName);
        if (index >= 0) this.excludesColumns.splice(index, 1);
      }
    }
  }

  getShowColumn(columnName: string): boolean {
    return !this.excludesColumns.includes(columnName);
  }

  protected startsWithUpperCase(input: string, search: string): boolean {
    return input && input.toUpperCase().startsWith(search);
  }

  protected markForCheck() {
    // Should be override by subclasses, depending on ChangeDetectionStrategy
  }

}

