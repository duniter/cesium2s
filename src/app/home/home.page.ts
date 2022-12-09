import {Component, Inject, Injector, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from "@app/settings/settings.service";
import {APP_LOCALES, LocaleConfig, Settings} from "@app/settings/settings.model";
import {BasePage} from "@app/shared/pages/base.page";
import {NetworkService} from "@app/network/network.service";
import {AbbreviatePipe} from "@app/shared/pipes/string.pipes";
import {AccountsService} from "@app/wallet/accounts.service";
import {Account} from "@app/wallet/account.model";
import {fadeInAnimation} from "@app/shared/animations";
import {AuthModal} from "@app/auth/auth.modal";
import {RegisterModal} from "@app/register/register.modal";
import {
  ActionSheetButton,
  ActionSheetController,
  ActionSheetOptions,
  IonModal,
  IonPopover,
  PopoverOptions
} from "@ionic/angular";
import {Router} from "@angular/router";
import {RxState} from "@rx-angular/state";

export interface LoginMethod {
  value: string;
  label: string;
  disabled?: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [fadeInAnimation],
  providers: [RxState]
})
export class HomePage extends BasePage<Settings> implements OnInit {


  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    backdropDismiss: true,
    cssClass: 'select-login-action-sheet'
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    backdropDismiss: true,
    cssClass: 'select-login-popover',
    reference: 'event'
  };
  protected loginMethods: LoginMethod[] = [
    {value: 'v1', label: 'Compte Duniter v1'},
    {value: 'v2', label: 'Phrase de restauration'},
    {value: 'keyfile-v1', label: 'Fichier de clef Duniter v1', disabled: true}
  ];

  defaultAccount: Account = null;
  currency$ = this._state.select('currency');


  get isLogin(): boolean {
    return this.accountService.isLogin
  }

  @ViewChild('loginModal') loginModal: IonModal;
  @ViewChild('registerModal') registerModal: IonModal;
  @ViewChild('loginMethodPopover') loginMethodPopover: IonPopover;

  constructor(
    injector: Injector,
    public networkService: NetworkService,
    public accountService: AccountsService,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
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


  changeLocale(locale: string) {
    this.settings.patchValue({locale});
    this._state.set('locale', (_) => locale);
    this.markForCheck();
  }

  async login(event) {

    let loginMethod: string;
    if (!this.mobile) {
      await this.loginMethodPopover.present(event);
      const {data} = await this.loginMethodPopover.onWillDismiss();
      loginMethod = data;
    }
    else {
      const actionSheet = await this.actionSheetCtrl.create({
        ...this.actionSheetOptions,
        header: this.translate.instant('Select login method'),
        buttons: this.loginMethods.map(method => {
          return <ActionSheetButton>{
            data: method.value,
            text: this.translate.instant(method.label),
            id: method.value
          }
        })
      });
      await actionSheet.present();
      const {data} = await actionSheet.onWillDismiss();
      loginMethod = data;
    }
    if (!loginMethod) return;
    console.info('[home] Selected login method: ' + loginMethod);

    let modal: IonModal;
    switch (loginMethod) {
      case 'v1':
        modal = this.loginModal;
        break;
      default:
        console.warn('[home] Unknown login method: ' + loginMethod);
    }
    if (!modal) return; // User cancelled of method not found

    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data?.address) {
      this.defaultAccount = data;
      setTimeout(() => this.router.navigate(['/wallet', data.address]));
    }
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
