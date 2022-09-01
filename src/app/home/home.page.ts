import {Component, Inject, Injector, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from "@app/settings/settings.service";
import {APP_LOCALES, LocaleConfig, Settings} from "@app/settings/settings.model";
import {BasePage} from "@app/shared/pages/base.page";
import {NetworkService} from "@app/network/network.service";
import {AbbreviatePipe} from "@app/shared/pipes/string.pipes";
import {AccountService} from "@app/wallet/account.service";
import {Account} from "@app/wallet/account.model";
import {fadeInAnimation} from "@app/shared/animations";
import {AuthModal} from "@app/auth/auth.modal";
import {RegisterModal} from "@app/register/register.modal";
import {IonModal} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [fadeInAnimation]
})
export class HomePage extends BasePage<Settings> implements OnInit {

  currency: string = null;

  defaultAccount: Account = null;
  get isLogin(): boolean {
    return this.accountService.isLogin
  }

  @ViewChild('authModal') authModal: IonModal;
  @ViewChild('registerModal') registerModal: IonModal;

  constructor(
    injector: Injector,
    public networkService: NetworkService,
    public accountService: AccountService,
    public router: Router,
    @Inject(APP_LOCALES) public locales: LocaleConfig[]
  ) {
    super(injector, {name: 'home'})
  }

  protected async ngOnLoad(): Promise<Settings> {
    await this.settings.ready();
    await this.networkService.ready();

    this.currency = this.networkService.currency.name;

    // Load account
    await this.accountService.ready();
    if (this.accountService.isLogin) {
      this.defaultAccount = await this.accountService.getDefault();
    }
    else {
      this.defaultAccount = null;
    }

    return this.settings.clone();
  }


  changeLocale(locale: string) {
    this.settings.patchValue({locale});
    this.data.locale = locale;
    this.markForCheck();
  }

  login(event) {
    return this.authModal.present();
  }

  async register(event) {
    await this.registerModal.present();

    const {data} = await this.registerModal.onWillDismiss();

    if (data?.address) {
      this.defaultAccount = data;
      setTimeout(() => this.router.navigate(['/wallet', data.address]));
    }
  }

  logout(event) {
    event?.preventDefault();
    this.accountService.forgetAll();
    this.defaultAccount = null;
  }
}
