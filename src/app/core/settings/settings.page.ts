import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {LocalSettings, PropertyValue, UsageMode} from '../services/model';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {AppForm} from '../form/form.class';
import {Moment} from 'moment/moment';
import {DateAdapter} from "@angular/material";
import {AppFormUtils, FormArrayHelper} from '../form/form.utils';
import {TranslateService} from "@ngx-translate/core";
import {ValidatorService} from "angular4-material-table";
import {LocalSettingsValidatorService} from "../services/local-settings.validator";
import {PlatformService} from "../services/platform.service";
import {NetworkService} from "../services/network/network.service";
import {isNilOrBlank, toBoolean} from "../../shared/functions";
import {LocalSettingsService} from "../services/local-settings.service";
import {Peer} from "../services/network/network.model";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  providers: [
    {provide: ValidatorService, useClass: LocalSettingsValidatorService},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage extends AppForm<LocalSettings> implements OnInit, OnDestroy {

  private _data: LocalSettings;

  mobile: boolean;
  loading = true;
  saving = false;
  usageModes: UsageMode[] = ['FIELD', 'DESK'];
  fields = [
    {
      key: 'qualitativeValue',
      label: 'SETTINGS.FIELDS.QUALITATIVE_VALUE',
      type: 'combo',
      values: ['label,name', 'name', 'name,label', 'label']
    },
    {
      key: 'taxonGroup',
      label: 'SETTINGS.FIELDS.TAXON_GROUP',
      type: 'combo',
      values: ['label,name', 'name', 'name,label', 'label']
    },
    {
      key: 'taxonName',
      label: 'SETTINGS.FIELDS.TAXON_NAME',
      type: 'combo',
      values: ['label,name', 'name', 'name,label', 'label']
    },
    {
      key: 'gear',
      label: 'SETTINGS.FIELDS.GEAR',
      type: 'combo',
      values: ['label,name', 'name', 'name,label', 'label']
    }

  ];
  fieldsMap: any;
  localeMap = {
    'fr': 'Français',
    'en': 'English'
  };
  locales: String[] = [];
  fieldsFormHelper: FormArrayHelper<PropertyValue>;

  get accountInheritance(): boolean {
    return this.form.controls['accountInheritance'].value;
  }

  get isLogin(): boolean {
    return this.accountService.isLogin();
  }

  get fieldsForm(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  constructor(
    protected dateAdapter: DateAdapter<Moment>,
    protected platform: PlatformService,
    protected validatorService: LocalSettingsValidatorService,
    protected translate: TranslateService,
    protected networkService: NetworkService,
    protected formBuilder: FormBuilder,
    protected accountService: AccountService,
    protected settings: LocalSettingsService,
    protected cd: ChangeDetectorRef
  ) {
    super(dateAdapter, validatorService.getFormGroup(), settings);

    // Fill locales
    for (let locale in this.localeMap) {
      this.locales.push(locale);
    }

    this.fieldsMap = this.fields.reduce((res, field) => {
      res[field.key] = field;
      return res;
    }, {});

    this.mobile = this.platform.mobile;

    // By default, disable the form
    this._enable = false;
  }

  async ngOnInit() {
    super.ngOnInit();

    this.fieldsFormHelper = new FormArrayHelper<PropertyValue>(this.formBuilder,
      this.form,
      'fields',
      (value) => this.validatorService.getFieldControl(value),
      (o1, o2) => (!o1 && !o2) || (o1.key === o2.key),
      (o) => !o || (!o.key && !o.value)
    );

    // Make sure platform is ready
    await this.platform.ready();

    // Load settings
    await this.load();

    this.accountService.onLogin.subscribe(() => this.setAccountInheritance(this.accountInheritance));
    this.accountService.onLogout.subscribe(() => this.setAccountInheritance(this.accountInheritance));
  }

  async load() {

    this.loading = true;
    console.debug("[settings] Loading settings...");

    const data = this.settings.settings || {};

    // Set defaults
    data.accountInheritance = toBoolean(data.accountInheritance, true);
    data.locale = data.locale || this.translate.currentLang || this.translate.defaultLang;
    data.usageMode = data.usageMode || 'DESK';

    // Set peer
    if (isNilOrBlank(data.peerUrl)) {
      await this.networkService.ready();
      const peer = this.networkService.peer;
      data.peerUrl = peer && peer.url;
    }

    // Set combo attributes
    data.fields = data.fields || [];

    // Remember data
    this._data = data;

    this.fieldsFormHelper.resize(data.fields.length);
    this.form.patchValue(data, {emitEvent: false});
    this.markAsPristine();

    this.enable({emitEvent: false});

    // Apply inheritance
    this.setAccountInheritance(data.accountInheritance, {emitEvent: false});

    this.loading = false;
    this.error = null;
    this.markForCheck();


  }

  async save(event: MouseEvent) {
    if (this.form.invalid) {
      AppFormUtils.logFormErrors(this.form);
      return;
    }

    console.debug("[settings] Saving local settings...");

    this.saving = true;
    this.error = undefined;
    const data = this.form.value;

    // Check peer alive, before saving
    const peerChanged = this.form.get('peerUrl').dirty;

    try {
      this.disable();

      await this.settings.saveLocalSettings(data);
      this._data = data;
      this.markAsPristine();

      // Update the network peer
      if (peerChanged) {
        this.networkService.peer = Peer.parseUrl(data.peerUrl);
      }

    } catch (err) {
      console.error(err);
      this.error = err && err.message || err;
    } finally {
      this.enable({emitEvent: false});

      // Apply inheritance
      this.setAccountInheritance(data.accountInheritance, {emitEvent: false});

      this.saving = false;
      this.markForCheck();
    }
  }

  public setAccountInheritance(enable: boolean, opts?: { emitEvent?: boolean; }) {
    // Make sure to update the value in control
    this.form.controls['accountInheritance'].setValue(enable, opts);
    if (this._data.accountInheritance !== enable) {
      this.form.controls['accountInheritance'].markAsDirty({onlySelf: false});
    }

    if (enable) {
      if (this.isLogin) {
        // Force using account settings
        const account = this.accountService.account;

        // Copy values
        if (account.settings) {
          if (account.settings.locale) this.form.get('locale').setValue(account.settings.locale, opts);
        }
        // Disable fields
        this.form.get('locale').disable(opts);
      } else {
        // Enable fields
        this.form.get('locale').enable(opts);
      }
    } else {
      // Restore previous values
      this.form.get('locale').setValue(this._data.locale, opts);

      // Enable fields
      this.form.get('locale').enable(opts);
    }

    // Mark for check, if need
    if (!opts || opts.emitEvent) {
      this.markForCheck();
    }
  }

  async selectPeer() {
    const peer = await this.networkService.selectPeer({allowSelectDownPeer: false});
    if (peer && peer.url) {
      const control = this.form.get('peerUrl') as FormControl;
      control.setValue(peer.url, {emitEvent: true, onlySelf: false});
      control.markAsDirty({onlySelf: false});
      this.markAsDirty();
    }

  }

  async cancel() {
    await this.load();
  }

  /* -- protected functions -- */

  protected markForCheck() {
    this.cd.markForCheck();
  }


}
