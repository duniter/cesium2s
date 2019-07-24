import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {ConfigOption, EntityUtils, LocalSettings} from '../services/model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AppForm} from '../form/form.class';
import {Moment} from 'moment/moment';
import {DateAdapter} from "@angular/material";
import {AppFormUtils, FormArrayHelper} from '../form/form.utils';
import {TranslateService} from "@ngx-translate/core";
import {ValidatorService} from "angular4-material-table";
import {LocalSettingsValidatorService} from "../services/local-settings.validator";
import {PlatformService} from "../services/platform.service";
import {NetworkService} from "../services/network/network.service";
import {isNil, isNilOrBlank, toBoolean} from "../../shared/functions";
import {LOCALES, LocalSettingsService} from "../services/local-settings.service";
import {Peer} from "../services/network/network.model";
import {FormFieldDefinition} from "../../shared/form/field.model";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  providers: [
    {provide: ValidatorService, useClass: LocalSettingsValidatorService},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage extends AppForm<LocalSettings> implements OnInit, OnDestroy {

  private _propertyDefinitionCache: { [index: number]: FormFieldDefinition } = {};
  private data: LocalSettings;

  mobile: boolean;
  loading = true;
  saving = false;
  locales = LOCALES;

  propertyDefinitions: ConfigOption[];
  propertyDefinitionsMap: { [key: string]: ConfigOption } = {};
  propertiesFormHelper: FormArrayHelper<{key: string; value: string}>;

  get accountInheritance(): boolean {
    return this.form.controls['accountInheritance'].value;
  }

  get isLogin(): boolean {
    return this.accountService.isLogin();
  }

  get propertiesForm(): FormArray {
    return this.form.get('properties') as FormArray;
  }

  constructor(
    protected dateAdapter: DateAdapter<Moment>,
    protected platform: PlatformService,
    protected validator: LocalSettingsValidatorService,
    protected translate: TranslateService,
    protected networkService: NetworkService,
    protected formBuilder: FormBuilder,
    protected accountService: AccountService,
    protected settings: LocalSettingsService,
    protected cd: ChangeDetectorRef
  ) {
    super(dateAdapter, validator.getFormGroup(), settings);

    this.propertyDefinitions = settings.propertyDefinitions.slice(); // copy options
    this.propertyDefinitions.forEach(o => this.propertyDefinitionsMap[o.key] = o); // fill map

    this.propertiesFormHelper = new FormArrayHelper<{key: string; value: string}>(
        this.formBuilder,
        this.form,
        'properties',
        (value) => this.validator.getPropertyFormGroup(value),
        (v1, v2) => (!v1 && !v2) || v1.key === v2.key,
        (value) => isNil(value) || (isNil(value.key) && isNil(value.value))
    );

    this.mobile = this.platform.mobile;

    // By default, disable the form
    this._enable = false;
  }

  async ngOnInit() {
    super.ngOnInit();

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

    const data = this.settings.settings;

    // Set defaults
    data.accountInheritance = toBoolean(data.accountInheritance, true);
    data.locale = data.locale || this.translate.currentLang || this.translate.defaultLang;

    // Set default peer
    if (isNilOrBlank(data.peerUrl)) {
      await this.networkService.ready();
      const peer = this.networkService.peer;
      data.peerUrl = peer && peer.url;
    }

    // Remember data
    this.updateView(data);
  }

  updateView(data: LocalSettings) {
    if (!data) return; //skip
    this.data = data;

    const json: any = Object.assign({}, this.settings.settings || {});

    // Transform properties map into array
    json.properties = EntityUtils.getObjectAsArray(data.properties || {});
    this.propertiesFormHelper.resize(Math.max(json.properties.length, 1));

    this.form.patchValue(json, {emitEvent: false});
    this.markAsPristine();

    this.enable({emitEvent: false});

    // Apply inheritance
    this.setAccountInheritance(json.accountInheritance, {emitEvent: false});

    this.loading = false;
    this.error = null;
    this.markForCheck();
  }

  async save(event: MouseEvent) {
    if (this.saving) return; // skip
    if (this.form.invalid) {
      AppFormUtils.logFormErrors(this.form);
      return;
    }

    console.debug("[settings] Saving local settings...");

    this.saving = true;
    this.error = undefined;
    const data = this.form.value;
    data.properties = data.properties && EntityUtils.getArrayAsObject(data.properties);

    // Check peer alive, before saving
    const peerChanged = this.form.get('peerUrl').dirty;

    try {
      this.disable();

      await this.settings.saveLocalSettings(data);

      this.updateView(data);

      // Update the network peer
      if (peerChanged) {
        this.networkService.peer = Peer.parseUrl(data.peerUrl);
      }

    } catch (err) {
      console.error(err);
      this.error = err && err.message || err;
    } finally {
      this.enable();
      this.saving = false;
    }
  }

  public setAccountInheritance(enable: boolean, opts?: { emitEvent?: boolean; }) {
    // Make sure to update the value in control
    this.form.controls['accountInheritance'].setValue(enable, opts);
    if (this.data.accountInheritance !== enable) {
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
      this.form.get('locale').setValue(this.data.locale, opts);

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

  getPropertyDefinition(index: number): ConfigOption {
    let option = this._propertyDefinitionCache[index];
    if (!option) {
      option = this.updatePropertyDefinition(index);
      this._propertyDefinitionCache[index] = option;
    }
    return option;
  }

  updatePropertyDefinition(index: number): ConfigOption {
    const optionKey = (this.propertiesForm.at(index) as FormGroup).controls.key.value;
    const option = optionKey && this.propertyDefinitionsMap[optionKey] || null;
    this.markForCheck();
    return option;
  }

  /* -- protected functions -- */

  protected markForCheck() {
    this.cd.markForCheck();
  }


}
