import {Injectable} from "@angular/core";
import {CoreOptions, LocalSettings} from "./model";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from '@ionic/storage';

import {FormFieldDefinition, isNotNil, toBoolean} from "../../shared/shared.module";
import {environment} from "../../../environments/environment";
import {Subject} from "rxjs";
import {isNotNilOrBlank} from "../../shared/functions";
import {Platform} from "@ionic/angular";
import {Peer} from "./network/network.model";

export const SETTINGS_STORAGE_KEY = "settings";
export const SETTINGS_TRANSIENT_PROPERTIES = ["mobile", "touchUi"];

export declare interface LocaleConfig {
  id: string;
  name: string;
  country?: string;
}
export const LOCALES: LocaleConfig[] = [
  {
    id: 'fr',
    name: 'Français',
    country: 'fr'
  },
  {
    id: 'en',
    name: 'English',
    country: 'gb'
  }
];

@Injectable()
export class LocalSettingsService {

  private _debug = false;
  private _startPromise: Promise<any>;
  private _started = false;
  private _additionalFields: FormFieldDefinition[] = [];

  private data: LocalSettings;


  public onChange = new Subject<LocalSettings>();

  get settings(): LocalSettings {
    return this.data;
  }

  get locale(): string {
    return this.data && this.data.locale || this.translate.currentLang || this.translate.defaultLang;
  }

  get mobile(): boolean {
    return this.data && toBoolean(this.data.mobile, this.platform.is('mobile'));
  }

  set mobile(value: boolean) {
    this.data.mobile = value;
  }

  get touchUi(): boolean {
    return this.data.touchUi;
  }

  set touchUi(value: boolean) {
    this.data.mobile = value;
  }

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private storage: Storage
  ) {

    // Register default options
    this.registerAdditionalFields(Object.getOwnPropertyNames(CoreOptions).map(key => CoreOptions[key]));

    this.resetData();

    this.start();
  }

  private resetData() {
    this.data = this.data || {};

    this.data.locale = this.translate.currentLang || this.translate.defaultLang;
    this.data.accountInheritance = true;
    this.data.mobile = undefined;

    const defaultPeer = environment.defaultPeer && Peer.fromObject(environment.defaultPeer);
    this.data.peerUrl = defaultPeer && defaultPeer.url || undefined;

    if (this._started) this.onChange.next(this.data);
  }

  async start() {
    if (this._startPromise) return this._startPromise;
    if (this._started) return;

    // Restoring local settings
    this._startPromise = this.platform.ready()
      .then(() => {
        this.data.mobile = this.platform.is('mobile');
        this.data.mobile = this.data.mobile || this.platform.is('phablet') || this.platform.is('tablet');
      })
      .then(() => this.restoreLocally())
      .then(async (settings) => {
        this._started = true;
        this._startPromise = undefined;
        return settings;
      });
    return this._startPromise;
  }

  public isStarted(): boolean {
    return this._started;
  }

  public ready(): Promise<void> {
    if (this._started) return Promise.resolve();
    return this.start();
  }

  public async restoreLocally(): Promise<LocalSettings | undefined> {

    // Restore from storage
    const settingsStr = await this.storage.get(SETTINGS_STORAGE_KEY);

    // Restore local settings (or keep old settings)
    if (isNotNilOrBlank(settingsStr)) {
      const restoredData = JSON.parse(settingsStr);

      // Avoid to override transient properties
      SETTINGS_TRANSIENT_PROPERTIES.forEach(transientKey => {
        delete restoredData[transientKey];
      });

      this.data = Object.assign(this.data, restoredData);
    }

    // Emit event
    this.onChange.next(this.data);

    return this.data;
  }

  getLocalSetting(key: string, defaultValue?: string): string {
    return this.data && isNotNil(this.data[key]) && this.data[key] || defaultValue;
  }

  async saveLocalSettings(settings: LocalSettings) {
    this.data = this.data || {};

    Object.assign(this.data, settings || {});

    // Save locally
    await this.saveLocally();

    // Emit event
    this.onChange.next(this.data);
  }


  async setLocalSetting(propertyName: string, value: any) {
    const data = {};
    data[propertyName] = value;
    await this.saveLocalSettings(data);
  }

  getProperty(propertyName: string): any {
    return this.data && this.data.properties && this.data.properties[propertyName];
  }

  getPropertyAsString(option: FormFieldDefinition): any {
    return this.getProperty(option.key) || option.defaultValue;
  }

  getPropertyAsBoolean(option: FormFieldDefinition): any {
    return toBoolean(this.getProperty(option.key), option.defaultValue);
  }

  async setProperty(key: string, value: any)  {
    if (!this.data || !this.data.properties || this.data.properties[key] !== value) {
      const changes = {properties: {}};
      changes.properties[key] = value;
      await this.saveLocalSettings(changes);
    }
  }

  public getPageSettings(pageId: string, propertyName?: string): string[] {
    const key = pageId.replace(/[/]/g, '__');
    return this.data && this.data.pages
      && this.data.pages[key] && (propertyName && this.data.pages[key][propertyName] || this.data.pages[key]);
  }

  public async savePageSetting(pageId: string, value: any, propertyName?: string) {
    const key = pageId.replace(/[/]/g, '__');

    this.data = this.data || {};
    this.data.pages = this.data.pages || {};
    if (propertyName) {
      this.data.pages[key] = this.data.pages[key] || {};
      this.data.pages[key][propertyName] = value;
    }
    else {
      this.data.pages[key] = value;
    }

    // Update local settings
    await this.saveLocally();
  }

  public getFieldAttributes(fieldName: string, defaultAttributes: string[]): string[] {
    const value = this.getProperty('field.' + fieldName);
    if (!value) {
      // Default
      console.debug(`[settings] No settings found for field {${fieldName}}: applying defaults`);
      return defaultAttributes;
    }
    return value.value.split(',');
  }

  get additionalFields(): FormFieldDefinition[] {
    return this._additionalFields;
  }

  getAdditionalField(key: string): FormFieldDefinition | undefined {
    return this._additionalFields.find(f => f.key === key);
  }

  registerAdditionalField(def: FormFieldDefinition) {
    if (this._additionalFields.findIndex(f => f.key === def.key) !== -1) {
      throw new Error(`Additional additional property {${def.key}} already define.`);
    }
    if (this._debug) console.debug(`[settings] Adding additional property {${def.key}}`, def);
    this._additionalFields.push(def);
  }

  registerAdditionalFields(defs: FormFieldDefinition[]) {
    (defs || []).forEach(propDef => this.registerAdditionalField(propDef));
  }

  /* -- Protected methods -- */

  private saveLocally(): Promise<any> {
    if (!this.data) {
      console.debug("[settings] Removing local settings fro storage");
      return this.storage.remove(SETTINGS_STORAGE_KEY);
    }
    else {
      console.debug("[settings] Store local settings", this.data);
      return this.storage.set(SETTINGS_STORAGE_KEY, JSON.stringify(this.data));
    }
  }
}
