import { Inject, Injectable, Optional } from '@angular/core';
import { Settings } from './settings.model';
import { environment } from '@environments/environment';
import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { APP_STORAGE, IStorage } from '@app/shared/services/storage/storage.utils';
import { RxStartableService } from '@app/shared/services/rx-startable-service.class';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { arrayDistinct } from '@app/shared/functions';
import { RxStateSelect } from '@app/shared/decorator/state.decorator';

const SETTINGS_STORAGE_KEY = 'settings';

@Injectable({ providedIn: 'root' })
export class SettingsService extends RxStartableService<Settings> {
  changes = new Subject<Settings>();

  get mobile() {
    return this.get('mobile');
  }

  @RxStateSelect() peer$: Observable<string>;

  constructor(
    protected ionicPlatform: Platform,
    @Inject(APP_STORAGE) @Optional() protected storage?: IStorage
  ) {
    super(ionicPlatform, {
      name: 'settings-service',
    });

    // Emit changes event
    this.hold(this.$, (value) => this.changes.next(value));
  }

  protected async ngOnStart(): Promise<Settings> {
    const mobile = this.ionicPlatform.is('mobile') || this.ionicPlatform.is('iphone') || this.ionicPlatform.is('android');

    const data = {
      ...(await this.restoreLocally()),
      mobile,
    };

    console.info('[settings-restore] Settings ready: ', data);

    return data;
  }

  clone(): Settings {
    return <Settings>{
      locale: environment.defaultLocale,
      peer: environment.defaultPeers?.[0],
      defaultPeers: environment.defaultPeers || [],
      ...this.get(),
    };
  }

  async restoreLocally(): Promise<Settings> {
    const data = await this.storage.get(SETTINGS_STORAGE_KEY);
    return <Settings>{
      // Default values
      preferredPeers: arrayDistinct([...environment.defaultPeers, ...(data?.preferredPeers || [])]),
      unAuthDelayMs: 15 * 60_000, // 15min
      // Restored data
      ...data,
    };
  }

  patchValue(data: Partial<Settings>) {
    if (!data) return;
    this.set((state) => <Settings>{ ...state, ...data });

    // Saving changes
    setTimeout(() => this.saveLocally(), 250);
  }

  async saveLocally() {
    if (!this.storage) return; // Skip, no storage

    console.info('[settings] Saving settings to the storage...');
    const data = this.clone();
    await this.storage.set('settings', data);
  }
}
