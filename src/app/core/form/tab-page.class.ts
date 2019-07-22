import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material";
import {Entity} from '../services/model';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {isNotNil, ToolbarComponent} from '../../shared/shared.module';
import {AppTable} from '../table/table.class';
import {AppForm} from './form.class';
import {FormButtonsBarComponent} from './form-buttons-bar.component';
import {first} from "rxjs/operators";
import {AppFormUtils} from "./form.utils";

export abstract class AppTabPage<T extends Entity<T>, F = any> implements OnInit, OnDestroy {

  private _forms: AppForm<any>[];
  private _tables: AppTable<any, any>[];
  private _subscriptions: Subscription[] = [];

  debug = false;
  data: T;
  selectedTabIndex = 0;
  submitted = false;
  error: string;
  loading = true;
  queryParams: {
    tab?: number;
    subtab?: number;
    [key: string]: any
  };

  @ViewChild(ToolbarComponent) appToolbar: ToolbarComponent;
  @ViewChild(FormButtonsBarComponent) formButtonsBar: FormButtonsBarComponent;

  get isNewData(): boolean {
    return !this.data || this.data.id === undefined || this.data.id === null;
  }

  public get dirty(): boolean {
    return (this._forms && !!this._forms.find(form => form.dirty)) || (this._tables && !!this._tables.find(table => table.dirty));
  }

  public get valid(): boolean {
    return (!this._forms || !this._forms.find(form => !form.valid)) && (!this._tables || !this._tables.find(table => !table.valid));
  }

  public get invalid(): boolean {
    return (this._forms && !!this._forms.find(form => form.invalid)) || (this._tables && !!this._tables.find(table => !table.invalid));
  }

  public get pending(): boolean {
    return (this._forms && !!this._forms.find(form => form.pending)) || (this._tables && !!this._tables.find(table => table.pending));
  }


  protected get tables(): AppTable<any, any>[] {
    return this._tables;
  }

  protected constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected alertCtrl: AlertController,
    protected translate: TranslateService
  ) {
    // Listen route parameters
    this.route.queryParams.pipe(first())
      .subscribe(queryParams => {
        // Copy original queryParams, for reuse in onTabChange()
        this.queryParams = Object.assign({}, queryParams);

        // Parse tab
        const tabIndex = queryParams["tab"];
        this.queryParams.tab = tabIndex && parseInt(tabIndex) || undefined;

        if (isNotNil(this.queryParams.tab)) {
          this.selectedTabIndex = this.queryParams.tab;
        }
      });
  }

  ngOnInit() {
    // Catch back click events
    if (this.appToolbar) {
      this.registerSubscription(this.appToolbar.onBackClick.subscribe(event => this.onBackClick(event)));
    }
    if (this.formButtonsBar) {
      this.registerSubscription(this.formButtonsBar.onBack.subscribe(event => this.onBackClick(event)));
    }
  }

  ngOnDestroy() {
    if (this._subscriptions.length) {
      if (this.debug) console.debug(`[page] Deleting ${this._subscriptions.length} subscriptions ${this.constructor.name}#*`);
      this._subscriptions.forEach(s => s.unsubscribe());
      this._subscriptions = [];
    }
  }

  abstract async load(id?: number, options?: F);

  abstract async save(event): Promise<any>;

  public registerForm(form: AppForm<any>): AppTabPage<T, F> {
    if (!form) throw 'Trying to register an invalid form';
    this._forms = this._forms || [];
    this._forms.push(form);
    return this;
  }

  public registerForms(forms: AppForm<any>[]): AppTabPage<T, F> {
    forms.forEach(form => this.registerForm(form));
    return this;
  }

  public registerTable(table: AppTable<any, any>): AppTabPage<T, F> {
    if (!table) throw new Error('Trying to register an invalid table');
    this._tables = this._tables || [];
    this._tables.push(table);
    return this;
  }

  public registerTables(tables: AppTable<any, any>[]): AppTabPage<T, F> {
    tables
      .filter(table => isNotNil(table)) // Skip not found tables
      .forEach(table => this.registerTable(table));
    return this;
  }

  public disable() {
    this._forms && this._forms.forEach(form => form.disable());
    this._tables && this._tables.forEach(table => table.disable());
    this.markForCheck();
  }

  public enable() {
    this._forms && this._forms.forEach(form => form.enable());
    this._tables && this._tables.forEach(table => table.enable());
    this.markForCheck();
  }

  public markAsPristine() {
    this.error = null;
    this.submitted = false;
    this._forms && this._forms.forEach(form => form.markAsPristine());
    this._tables && this._tables.forEach(table => table.markAsPristine());
    this.markForCheck();
  }

  public markAsUntouched() {
    this._forms && this._forms.forEach(form => form.markAsUntouched());
    this._tables && this._tables.forEach(table => table.markAsUntouched());
    this.markForCheck();
  }

  public markAsTouched() {
    this._forms && this._forms.forEach(form => form.markAsTouched());
    this._tables && this._tables.forEach(table => table.markAsTouched());
    this.markForCheck();
  }

  public onTabChange(event: MatTabChangeEvent) {
    if (!this.queryParams || +this.queryParams.tab !== event.index) {

      this.queryParams = this.queryParams || {};
      Object.assign(this.queryParams, {tab: event.index});

      if (isNotNil(this.queryParams.subtab)) {
        delete this.queryParams.subtab; // clean subtab
      }
      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: this.queryParams,
        replaceUrl: true
      });
    }
  }

  public onSubTabChange(event: MatTabChangeEvent) {
    if (!this.queryParams || +this.queryParams.subtab !== event.index) {
      this.queryParams = this.queryParams || {};
      Object.assign(this.queryParams, {subtab: event.index});

      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: this.queryParams,
        replaceUrl: true
      });
    }
  }

  public async cancel() {
    if (!this.dirty) return;
    await this.reload();
  };

  public onBackClick(event: Event) {
    if (event.defaultPrevented) return;

    // Stop the go back event, to be able to override it
    event.preventDefault();

    setTimeout(async () => {
      let confirm = !this.dirty;
      let save = false;

      if (!confirm) {

        let alert;
        // Ask user before
        if (this.valid) {
          const translations = this.translate.instant(['COMMON.BTN_CANCEL', 'COMMON.BTN_SAVE', 'COMMON.BTN_ABORT_CHANGES',
            'CONFIRM.SAVE_BEFORE_CLOSE', 'CONFIRM.ALERT_HEADER']);
          alert = await this.alertCtrl.create({
            header: translations['CONFIRM.ALERT_HEADER'],
            message: translations['CONFIRM.SAVE_BEFORE_CLOSE'],
            buttons: [
              {
                text: translations['COMMON.BTN_CANCEL'],
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                }
              },
              {
                text: translations['COMMON.BTN_ABORT_CHANGES'],
                cssClass: 'secondary',
                handler: () => {
                  confirm = true;
                }
              },
              {
                text: translations['COMMON.BTN_SAVE'],
                handler: () => {
                  save = true;
                  confirm = true;
                }
              }
            ]
          });
        } else {
          const translations = this.translate.instant(['COMMON.BTN_ABORT_CHANGES', 'COMMON.BTN_CANCEL', 'CONFIRM.CANCEL_CHANGES', 'CONFIRM.ALERT_HEADER']);

          alert = await this.alertCtrl.create({
            header: translations['CONFIRM.ALERT_HEADER'],
            message: translations['CONFIRM.CANCEL_CHANGES'],
            buttons: [
              {
                text: translations['COMMON.BTN_ABORT_CHANGES'],
                cssClass: 'secondary',
                handler: () => {
                  confirm = true; // update upper value
                }
              },
              {
                text: translations['COMMON.BTN_CANCEL'],
                role: 'cancel',
                handler: () => {
                }
              }
            ]
          });
        }
        await alert.present();
        await alert.onDidDismiss();

      }


      if (confirm) {
        if (save) {
          await this.save(event); // sync save
        } else if (this.dirty && this.data.id) {
          this.doReload(); // async reload
        }

        // Execute the action
        this.appToolbar.goBack();
      }

    }, 300);
  }

  public async reload(confirm?: boolean) {
    const needConfirm = this.dirty;
    // if not confirm yet: ask confirmation
    if (!confirm && needConfirm) {
      const translations = this.translate.instant(['COMMON.BTN_ABORT_CHANGES', 'COMMON.BTN_CANCEL', 'CONFIRM.CANCEL_CHANGES', 'CONFIRM.ALERT_HEADER']);
      const alert = await this.alertCtrl.create({
        header: translations['CONFIRM.ALERT_HEADER'],
        message: translations['CONFIRM.CANCEL_CHANGES'],
        buttons: [
          {
            text: translations['COMMON.BTN_ABORT_CHANGES'],
            cssClass: 'secondary',
            handler: () => {
              confirm = true; // update upper value
            }
          },
          {
            text: translations['COMMON.BTN_CANCEL'],
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
      await alert.onDidDismiss();
    }

    // If confirm: execute the reload
    if (confirm || !needConfirm) {
      this.scrollToTop();
      this.disable();
      return await this.doReload();
    }
  }

  public async doReload() {
    this.loading = true;
    await this.load(this.data && this.data.id);
  }

  /* -- protected methods -- */

  protected async scrollToTop() {
    // TODO: FIXME (not working as the page is not the window)
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  protected registerSubscription(sub: Subscription) {
    this._subscriptions.push(sub);
    if (this.debug) console.debug(`[page] Registering a new subscription ${this.constructor.name}#${this._subscriptions.length}`);
  }

  protected async saveIfDirtyAndConfirm(): Promise<boolean> {
    if (!this.dirty) return true;

    let confirm = false;
    let cancel = false;
    const translations = this.translate.instant(['COMMON.BTN_SAVE', 'COMMON.BTN_CANCEL', 'COMMON.BTN_ABORT_CHANGES', 'CONFIRM.SAVE', 'CONFIRM.ALERT_HEADER']);
    const alert = await this.alertCtrl.create({
      header: translations['CONFIRM.ALERT_HEADER'],
      message: translations['CONFIRM.SAVE'],
      buttons: [
        {
          text: translations['COMMON.BTN_CANCEL'],
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            cancel = true;
          }
        },
        {
          text: translations['COMMON.BTN_ABORT_CHANGES'],
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: translations['COMMON.BTN_SAVE'],
          handler: () => {
            confirm = true; // update upper value
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();

    if (!confirm) return !cancel;

    const saved = await this.save(event);
    return saved;
  }

  protected logFormErrors() {
    if (this.debug) console.debug("[root-editor-form] Page not valid. Checking where (forms, tables)...");
    (this._forms || []).forEach(appForm => {
      if (!appForm.empty && appForm.invalid) {
        AppFormUtils.logFormErrors(appForm.form, `"[root-editor-form] [${appForm.constructor.name.toLowerCase()}] `);
      }
    });
    (this._tables || []).forEach(appTable => {
      if (appTable.invalid && appTable.editedRow && appTable.editedRow.validator) {
        AppFormUtils.logFormErrors(appTable.editedRow.validator, `"[root-editor-form] [${appTable.constructor.name.toLowerCase()}] `);
      }
    });
  }

  protected markForCheck() {
    // Should be override by subclasses, if change detection is Push
  }
}
