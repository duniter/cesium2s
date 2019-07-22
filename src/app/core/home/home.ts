import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RegisterModal} from '../register/modal/modal-register';
import {Subscription} from 'rxjs';
import {AccountService} from '../services/account.service';
import {Account} from '../services/model';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from "../services/local-settings.service";
import {fadeInAnimation} from "../../shared/material/material.module";
import {PlatformService} from "../services/platform.service";


@Component({
  moduleId: module.id.toString(),
  selector: 'app-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class HomePage implements OnDestroy {

  loading = true;
  showSpinner = true;
  displayName: String = '';
  isLogin: boolean;
  subscriptions: Subscription[] = [];
  contentStyle = {};

  get currentLocaleCode(): string {
    return (this.translate.currentLang || this.translate.defaultLang).substr(0,2);
  }

  constructor(
    private accountService: AccountService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private settings: LocalSettingsService,
    private platform: PlatformService,
    private cd: ChangeDetectorRef
  ) {

    this.showSpinner = !this.platform.started;

    this.platform.ready().then(() => {
      this.isLogin = accountService.isLogin();
      if (this.isLogin) {
        this.onLogin(this.accountService.account);
      }
      // Subscriptions
      this.subscriptions.push(this.accountService.onLogin.subscribe(account => this.onLogin(account)));
      this.subscriptions.push(this.accountService.onLogout.subscribe(() => this.onLogout()));

      setTimeout(() => {
        this.loading = false;
        this.markForCheck();
      }, 500);
    });
  };

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  onLogin(account: Account) {
    //console.debug('[home] Logged account: ', account);
    this.isLogin = true;
    this.displayName = account &&
      ((account.firstName && (account.firstName + " ") || "") +
        (account.lastName || "")) || "";
    this.markForCheck();
  }

  onLogout() {
    //console.log('[home] Logout');
    this.isLogin = false;
    this.displayName = "";
    this.markForCheck();
  }

  async register() {
    const modal = await this.modalCtrl.create({component: RegisterModal});
    return modal.present();
  }

  logout(event: any) {
    this.accountService.logout();
  }

  changeLanguage(locale: string) {

    this.settings.saveLocalSettings({locale: locale})
      .then(() => {
        this.markForCheck();
      });
  }

  protected markForCheck() {
    this.cd.markForCheck();
  }
}
