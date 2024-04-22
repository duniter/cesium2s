import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { APP_LOCALES, LocaleConfig, Settings } from '@app/settings/settings.model';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { NetworkService } from '@app/network/network.service';
import { AccountsService } from '@app/account/accounts.service';
import { Account } from '@app/account/account.model';
import { fadeInAnimation } from '@app/shared/animations';
import { Router } from '@angular/router';
import { AuthController } from '@app/account/auth/auth.controller';
import { TransferController } from '@app/transfer/send/transfer.controller';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { Observable } from 'rxjs';
import { Currency } from '@app/currency/currency.model';
import { RxState } from '@rx-angular/state';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { AlertController } from '@ionic/angular';

export interface HomePageState extends AppPageState, Settings {
  defaultAccount: Account;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [fadeInAnimation],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage extends AppPage<HomePageState> implements OnInit {
  @RxStateProperty() defaultAccount: Account;
  @RxStateProperty() locale: string;

  @RxStateSelect() currency$: Observable<Currency>;
  @RxStateSelect() defaultAccount$: Observable<Account>;

  get isLogin(): boolean {
    return this.accountService.isLogin;
  }

  constructor(
    protected networkService: NetworkService,
    protected accountService: AccountsService,
    protected alertController: AlertController,
    protected authController: AuthController,
    protected transferController: TransferController,
    protected router: Router,
    @Inject(APP_LOCALES) public locales: LocaleConfig[]
  ) {
    super({ name: 'home' });
  }

  protected async ngOnLoad() {
    await Promise.all([this.settings.ready(), this.networkService.ready(), this.accountService.ready()]);

    const currency = this.networkService.currency.displayName;

    // Load account
    const defaultAccount: Account = this.accountService.isLogin ? await this.accountService.getDefault() : null;

    return {
      ...this.settings.clone(),
      currency,
      defaultAccount,
    };
  }

  changeLocale(locale: string): boolean {
    this.settings.patchValue({ locale });
    this.locale = locale;
    this.markForCheck();
    return true;
  }

  async login(event: MouseEvent | TouchEvent | PointerEvent | CustomEvent) {
    const data = await this.accountService.login(event, {
      auth: true,
    });
    if (data?.address) {
      this.defaultAccount = data;
      setTimeout(() => this.router.navigate(['/wallet', data.address]));
    }
  }

  async register(event?: Event) {
    event?.preventDefault();
    const data = await this.authController.createNew({
      redirectToWalletPage: true,
    });
    if (data?.address) {
      this.defaultAccount = data;
    }
  }

  async logout(event?: Event) {
    event?.preventDefault();
    const alert = await this.alertController.create({
      header: this.translate.instant('CONFIRM.POPUP_TITLE'),
      //subHeader: 'A Sub Header Is Optional',
      message: this.translate.instant('CONFIRM.LOGOUT'),
      buttons: [
        {
          text: this.translate.instant('COMMON.BTN_CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.BTN_LOGOUT'),
          role: 'confirm',
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

    if (role === 'confirm') {
      this.accountService.forgetAll();
      this.defaultAccount = null;
    }
  }

  transfer() {
    return this.transferController.transfer();
  }
}
