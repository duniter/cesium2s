import {EventEmitter, Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";
import {NetworkService} from "./network.service";
import {Platforms} from "@ionic/core";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {Keyboard} from "@ionic-native/keyboard/ngx";
import {LocalSettingsService} from "./local-settings.service";
import {CacheService} from "ionic-cache";


@Injectable()
export class PlatformService {

  private _started = false;
  private _startPromise: Promise<void>;

  public mobile: boolean;
  public touchUi: boolean;


  get started(): boolean {
    return this._started;
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private keyboard: Keyboard,
    private settings: LocalSettingsService,
    private networkService: NetworkService,
    private cache: CacheService
  ) {

    this.start();
  }

  is(platformName: Platforms): boolean {
    return this.platform.is(platformName);
  }

  protected async start() {
    if (this._startPromise) return this._startPromise;
    if (this._started) return;

    this._started = false;
    console.info("[platform] Starting platform...");

    this._startPromise = Promise.all([
      this.platform.ready()
        .then(() => {

          this.configureCordovaPlugins();

          this.touchUi = this.platform.is('mobile') || this.platform.is('tablet') || this.platform.is('phablet');
          this.mobile = this.platform.is('mobile');

          // Force mobile in settings
          if (this.mobile) {
            this.settings.mobile = this.mobile;
          }
        }),
      this.cache.ready()
        .then(() => {
          this.cache.setDefaultTTL(60 * 60); // 1 hour
          this.cache.setOfflineInvalidate(false);
        }),
      this.settings.ready(),
      this.networkService.ready()
    ])
      .then(() => {
        this._started = true;
        this._startPromise = undefined;
        console.info(`[platform] Platform started: mobile=${this.mobile} touchUi=${this.touchUi}`);

        // Wait 1 more seconds, before hiding the splash screen
        setTimeout(() => {
          this.splashScreen.hide();
        }, 1000);
      });
    return this._startPromise;
  }

  ready(): Promise<void> {
    if (this._started) return Promise.resolve();
    if (this._startPromise) return this._startPromise;
    return this.start();
  }

  protected configureCordovaPlugins() {
    console.info("[platform] Setting Cordova plugins...");
    this.statusBar.styleDefault();
    this.statusBar.overlaysWebView(false);
    this.keyboard.hideFormAccessoryBar(true);

  }
}

