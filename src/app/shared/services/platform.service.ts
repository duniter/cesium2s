import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {NetworkService} from "../../network/network.service";
import {SettingsService} from "../../settings/settings.service";
import {StartableService} from "@app/shared/services/startable-service.class";
import {StorageService} from "@app/shared/services/storage.service";
import {environment} from "@environments/environment.prod";
import {TranslateService} from "@ngx-translate/core";
import * as momentImported from 'moment';
import {Subject} from "rxjs";
import {Settings} from "@app/settings/settings.model";
const moment = momentImported;

@Injectable({
  providedIn: 'root'
})
export class PlatformService extends StartableService {

  private _mobile: boolean = null;
  private _touchUi: boolean = null;


  get mobile(): boolean {
    return this._mobile != null ? this._mobile : this.ionicPlatform.is('mobile');
  }

  get touchUi(): boolean {
    return this._touchUi != null ? this._touchUi :
      (this.mobile || this.ionicPlatform.is('tablet') || this.ionicPlatform.is('phablet'));
  }

  constructor(
    protected ionicPlatform: Platform,
    protected translate: TranslateService,
    protected settings: SettingsService,
    protected network: NetworkService,
    protected storage: StorageService
  ) {
    super(ionicPlatform, {
      name: 'platform-service'
    })
  }

  async ngOnStart(): Promise<any> {

    this._mobile = this.mobile;
    this._touchUi = this.touchUi;


    // Configure translation
    await this.configureTranslate();

    await this.configureStorage();

    await Promise.all([
        this.settings.ready(),
        this.network.ready()
      ]
    );
  }


  protected configureTranslate() {
    console.info('[platform] Configuring i18n ...');

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(environment.defaultLocale);

    // When locale changes, apply to date adapter
    this.translate.onLangChange.subscribe(event => {
      if (event && event.lang) {

        // force 'en' as 'en_GB'
        if (event.lang === 'en') {
          event.lang = 'en_GB';
        }

        // config moment lib
        try {
          moment.locale(event.lang);
          console.debug('[platform] Use locale {' + event.lang + '}');
        }
          // If error, fallback to en
        catch (err) {
          moment.locale('en');
          console.warn('[platform] Unknown local for moment lib. Using default [en]');
        }

        // Config date adapter
        //this.dateAdapter.setLocale(moment.locale());
      }
    });

    this.settings.changes.subscribe(data => {
      if (data?.locale && data.locale !== this.translate.currentLang) {
        this.translate.use(data.locale);
      }
    });
  }

  private async configureStorage(): Promise<void> {
    console.info(`[platform] Configure storage...`);
    await this.storage.configure({
      group: environment.storage?.name
    });
  }
}
