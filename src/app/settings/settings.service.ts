import { Inject, Injectable, Optional } from '@angular/core';
import { CurrencyDisplayUnit, Settings } from './settings.model';
import { environment } from '@environments/environment';
import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { APP_STORAGE, IStorage } from '@app/shared/services/storage/storage.utils';
import { RxStartableService } from '@app/shared/services/rx-startable-service.class';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { arrayDistinct } from '@app/shared/functions';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { isMobile } from '@app/shared/platforms';

const SETTINGS_STORAGE_KEY = 'settings';

@Injectable({ providedIn: 'root' })
export class SettingsService extends RxStartableService<Settings> {
  changes = new Subject<Settings>();

  get mobile() {
    return this.get('mobile');
  }

  @RxStateSelect() darkMode$: Observable<boolean>;
  @RxStateSelect() peer$: Observable<string>;
  @RxStateSelect() indexer$: Observable<string>;
  @RxStateSelect() displayUnit$: Observable<CurrencyDisplayUnit>;

  @RxStateProperty() darkMode: boolean;
  @RxStateProperty() peer: string;
  @RxStateProperty() indexer: string;
  @RxStateProperty() displayUnit: CurrencyDisplayUnit;

  constructor(
    protected ionicPlatform: Platform,
    @Inject(APP_STORAGE) @Optional() protected storage?: IStorage
  ) {
    super(ionicPlatform, {
      name: 'settings-service',
      initialState: {
        mobile: isMobile(window),
        displayUnit: 'base',
      },
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

    console.info('[settings-service] Settings ready: ', data);

    return data;
  }

  clone(): Settings {
    return <Settings>{
      locale: environment.defaultLocale,
      defaultPeers: environment.defaultPeers || [],
      peer: environment.defaultPeers?.[0],
      defaultIndexers: environment.defaultIndexers || [],
      indexer: environment.defaultIndexers?.[0],
      ...this.get(),
    };
  }

  async restoreLocally(): Promise<Settings> {
    const data = await this.storage.get(SETTINGS_STORAGE_KEY);
    return <Settings>{
      // Default values
      preferredPeers: arrayDistinct([...environment.defaultPeers, ...(data?.preferredPeers || [])]),
      preferredIndexers: arrayDistinct([...environment.defaultIndexers, ...(data?.preferredIndexers || [])]),
      unAuthDelayMs: 15 * 60_000, // 15 min
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
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

    console.info('[settings-service] Saving settings to the storage...');
    const data = this.clone();
    await this.storage.set('settings', data);
  }
}
