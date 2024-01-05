import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NetworkService } from '@app/network/network.service';
import { SettingsService } from '@app/settings/settings.service';
import { StorageService } from '@app/shared/services/storage/storage.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { CapacitorPlugins } from '@app/shared/capacitor/plugins';
import { StartableService } from '@app/shared/services/startable-service.class';
import { DateUtils } from '@app/shared/dates';

@Injectable({
  providedIn: 'root',
})
export class PlatformService extends StartableService {
  private _mobile: boolean = null;
  private _touchUi: boolean = null;
  private _cordova: boolean = null;
  private _capacitor: boolean = null;

  get mobile(): boolean {
    return this._mobile != null ? this._mobile : this.ionicPlatform.is('mobile');
  }

  get touchUi(): boolean {
    return this._touchUi != null ? this._touchUi : this.mobile || this.ionicPlatform.is('tablet') || this.ionicPlatform.is('phablet');
  }

  get capacitor(): boolean {
    return this._capacitor != null ? this._capacitor : this.ionicPlatform.is('capacitor');
  }

  get cordova(): boolean {
    return this._cordova != null ? this._cordova : this.ionicPlatform.is('cordova');
  }

  constructor(
    protected ionicPlatform: Platform,
    protected translate: TranslateService,
    protected settings: SettingsService,
    protected network: NetworkService,
    protected storage: StorageService
  ) {
    super(ionicPlatform, {
      name: 'platform-service',
    });
  }

  async ngOnStart(): Promise<void> {
    this._mobile = this.mobile;
    this._touchUi = this.touchUi;
    this._cordova = this.cordova;
    this._capacitor = this.capacitor;

    // Configure theme
    await this.configureTheme();

    // Configure Capacitor plugins
    await this.configureCapacitorPlugins();

    // Configure translation
    await this.configureTranslate();

    await Promise.all([this.storage.ready(), this.settings.ready(), this.network.ready()]);
  }

  toggleDarkTheme(enable: boolean) {
    if (enable && !document.body.classList.contains('dark')) {
      console.debug('[platform] Enable dark mode...');
    }
    document.body.classList.toggle('dark', enable);
  }

  protected async configureTheme() {
    // Listen for changes to settings dark mode
    this.registerSubscription(this.settings.darkMode$.subscribe((darkMode) => this.toggleDarkTheme(darkMode)));
  }

  protected async configureCapacitorPlugins() {
    if (!this._capacitor) return; // Skip

    console.info('[platform] Configuring Cordova plugins...');

    let plugin: string;
    try {
      plugin = CapacitorPlugins.StatusBar;
      await StatusBar.setOverlaysWebView({ overlay: false });

      plugin = CapacitorPlugins.Keyboard;
      await Keyboard.setAccessoryBarVisible({ isVisible: false });
    } catch (err) {
      console.error(`[platform] Error while configuring ${plugin} plugin: ${err?.originalStack || JSON.stringify(err)}`);
    }
  }

  protected async configureTranslate() {
    console.info('[platform] Configuring i18n ...');

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(environment.defaultLocale);

    // When locale changes, apply to date adapter
    this.translate.onLangChange.subscribe((event) => {
      if (event && event.lang) {
        // config moment lib
        try {
          DateUtils.moment.locale(event.lang);
          console.debug('[platform] Use locale {' + event.lang + '}');
        } catch (err) {
          // If error, fallback to en
          DateUtils.moment.locale('en');
          console.warn('[platform] Unknown local for moment lib. Using default [en]');
        }

        // Config date adapter
        //this.dateAdapter.setLocale(moment.locale());
      }
    });

    this.settings.changes.subscribe((data) => {
      if (data?.locale) {
        if (data.locale !== this.translate.currentLang) {
          this.translate.use(data.locale);
        }
      } else {
        // Applying default, when settings has no locale property (hotfix - ludovic.pecquot@e-is.pro - 14/11/2021 - since v1.20.42)
        console.warn('[platform] No locale found in settings: applying defaultLocale: ', environment.defaultLocale);
        this.translate.use(environment.defaultLocale);
      }
    });
  }
}
