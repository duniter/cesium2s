import {Inject, Injectable, Optional} from "@angular/core";
import {Settings} from "./settings.model";
import {environment} from "@environments/environment";
import {StartableService} from "@app/shared/services/startable-service.class";
import {Platform} from "@ionic/angular";
import {Subject} from "rxjs";
import {APP_STORAGE, IStorage} from "@app/shared/services/storage/storage.utils";

const SETTINGS_STORAGE_KEY = 'settings';

@Injectable({providedIn: 'root'})
export class SettingsService extends StartableService<Settings> {

  private _mobile: boolean;

  changes = new Subject<Settings>();

  get mobile() {
    return this._mobile;
  }

  get data(): Settings {
    return this._data;
  }

  constructor(
    protected ionicPlatform: Platform,
    @Inject(APP_STORAGE) @Optional() protected storage?: IStorage
  ) {
    super(ionicPlatform, {
      name: 'settings-service'
    });

  }

  protected async ngOnStart(): Promise<Settings> {

    this._mobile = this.ionicPlatform.is('mobile')
      || this.ionicPlatform.is('iphone')
      || this.ionicPlatform.is('android');

    const data = await this.restoreLocally();

    console.info('[settings-restore] Mobile: ', this._mobile);
    console.info('[settings-restore] Settings ready: ', data);

    return data;
  }

  clone(): Settings {
    return <Settings>{
      locale: environment.defaultLocale,
      peer: environment.defaultPeers && environment.defaultPeers[0],
      defaultPeers: environment.defaultPeers || [],
      ...this._data
    }
  }

  async restoreLocally(): Promise<Settings> {

    const savedData = await this.storage.get(SETTINGS_STORAGE_KEY);
    const data = <Settings>{
      preferredPeers: !environment.production && environment.dev?.peer
        ? [environment.dev.peer]
        : [...environment.defaultPeers],
      unAuthDelayMs: 15 * 60_000, // 15min
      ...savedData
    };
    return data;
  }

  patchValue(data: Partial<Settings>) {
    if (!data) return;
    this._data = {
      ...this._data,
      ...data
    };
    this.changes.next(this._data);

    // Saving changes
    setTimeout(() => this.saveLocally(), 250);
  }

  async saveLocally() {
    if (!this.storage) return; // Skip, no storage

    console.info('[settings] Saving settings to the storage...');
    const data = this.clone();
    await this.storage?.set('settings', data);
  }
}
