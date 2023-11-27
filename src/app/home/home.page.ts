import {Component, Inject, Injector, OnInit} from '@angular/core';
import {APP_LOCALES, LocaleConfig, Settings} from "@app/settings/settings.model";
import {BasePage, BasePageState} from "@app/shared/pages/base.page";
import {NetworkService} from "@app/network/network.service";
import {AccountsService} from "@app/wallet/accounts.service";
import {Account} from "@app/wallet/account.model";
import {fadeInAnimation} from "@app/shared/animations";
import {Router} from "@angular/router";
import {AuthController} from "@app/auth/auth.controller";
import {TransferController} from '@app/transfer/transfer.controller';


export interface HomePageState extends BasePageState, Settings {

}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [fadeInAnimation],
})
export class HomePage extends BasePage<HomePageState> implements OnInit {

  defaultAccount: Account = null;
  currency$ = this._state.select('currency');


  get isLogin(): boolean {
    return this.accountService.isLogin
  }

  constructor(
    injector: Injector,
    public networkService: NetworkService,
    public accountService: AccountsService,
    public authController: AuthController,
    public transferController: TransferController,
    public router: Router,
    @Inject(APP_LOCALES) public locales: LocaleConfig[]
  ) {
    super(injector, {name: 'home'})
  }

  protected async ngOnLoad(): Promise<Settings> {
    await this.settings.ready();
    await this.networkService.ready();

    const currency = this.networkService.currency.displayName;

    // Load account
    await this.accountService.ready();
    if (this.accountService.isLogin) {
      this.defaultAccount = await this.accountService.getDefault();
    }
    else {
      this.defaultAccount = null;
    }

    return {
      ...this.settings.clone(),
      currency
    };
  }

  changeLocale(locale: string): boolean  {
    this.settings.patchValue({locale});
    this._state.set('locale', (_) => locale);
    this.markForCheck();
    return true;
  }

  async login(event: UIEvent) {
    const data = await this.authController.login(event, {
      auth: true
    });
    if (data?.address) {
      this.defaultAccount = data;
      setTimeout(() => this.router.navigate(['/wallet', data.address]));
    }
  }

  async register() {
    const data = await this.authController.register();
    if (data?.address) {
      this.defaultAccount = data;
      setTimeout(() => this.router.navigate(['/wallet', data.address]));
    }
  }

  logout(even?: Event) {
    event?.preventDefault();
    this.accountService.forgetAll();
    this.defaultAccount = null;
  }

  transfer(event?: UIEvent) {
    return this.transferController.transfer(event);
  }
}
