import {AfterViewChecked, ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "./account.service";
import {Clipboard} from "@capacitor/clipboard";
import {BasePage} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";
import {isEmptyArray, isNilOrBlank, isNotNil} from "@app/shared/functions";
import {NetworkService} from "@app/network/network.service";
import {ActionSheetOptions, IonModal, PopoverOptions} from "@ionic/angular";
import {Router} from "@angular/router";
import {RxStateProperty} from "@app/shared/decorator/state.decorator";
import {AuthController} from '@app/auth/auth.controller';
import {RxState} from "@rx-angular/state";
import {filter} from "rxjs/operators";


export interface WalletState {
  accounts: Account[];
  account: Account;
  address: string;
  currency: string;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class WalletPage extends BasePage<WalletState> implements OnInit, AfterViewChecked {

  static NEW = <Account>{
    address: ''
  };

  @RxStateProperty() accounts: Account[];
  @RxStateProperty() account: Account;
  @RxStateProperty() address: string;
  @RxStateProperty() currency: string;

  get balance(): number {
    if (!this.account?.data) return undefined;
    return (this.account.data.free || 0) + (this.account.data.reserved || 0);
  }

  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet'
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
    reference: 'event'
  };

  readonly account$ = this._state.select('account');
  readonly accounts$ = this._state.select('accounts');



  get new(): Account {
    return WalletPage.NEW;
  }

  @ViewChild('authModal') authModal: IonModal;
  @ViewChild('qrCodeModal') qrCodeModal: IonModal;

  constructor(
    injector: Injector,
    protected router: Router,
    protected networkService: NetworkService,
    protected accountService: AccountService,
    protected authController: AuthController
  ) {
    super(injector, {
      name: 'wallet-page',
      loadDueTime: accountService.started ? 0 : 250
    })

    this._state.connect('accounts', this.accountService.watchAll());

    const accounts$ = this._state.select('accounts')
      .pipe(filter(isNotNil));

    this._state.hold(accounts$.pipe(
      filter(isNotNil),
      filter(isEmptyArray)
    ), async (accounts) => {
      const account = await this.openAuthModal();
      this._state.set('accounts', (state) => [account]);
    });

    this._state.hold(this._state.select(), async (s) => {
      if (isEmptyArray(s.accounts) || isNotNil(s.account) || isNilOrBlank(s.address)) return;

      console.debug(this._logPrefix + 'Loading account from address: ' + s.address);

      if (s.address === 'default') {
        const account = await this.accountService.getDefault();
        this.account = account;
        this.address = account?.address;
      }

      // Load by address
      const isAddressAvailable = await this.accountService.isAvailable(s.address);
      if (isAddressAvailable) {
        this.account = await this.accountService.getByAddress(s.address);
        return;
      }

      // Try by name
      const account = await this.accountService.getByName(s.address);
      this._state.set('account', (state) => account);
      this._state.set('address', (state) => account.address);
    });
  }

  async ngOnInit() {
    console.info(this._logPrefix + 'Initializing...');
    super.ngOnInit();
  }

  ngAfterViewChecked() {

    // if (!this.loading && !this) {
    //   // force page reload, when no accounts available
    //   if (isEmptyArray(this.accounts)) {
    //     this.info('No account: redirect to home...');
    //     setTimeout(() => this.goHome());
    //   }
    //   else {
    //     // force page reload, when auth was previously cancelled
    //     this.info('Reloading page...');
    //     setTimeout(() => this.load());
    //   }
    // }
  }

  protected goHome() {
    return this.router.navigateByUrl('/home');
  }

  protected async ngOnLoad(): Promise<WalletState> {

    this.info('Loading wallet page...');

    return {
      accounts: this.accountService.accounts,
      account: null,
      address: this.activatedRoute.snapshot.paramMap.get('address'),
      currency: this.networkService.currencySymbol
    };
  }

  async copyAddress() {
    if (this.loading || !this.account?.address) return; // Skip

    await Clipboard.write({
      string: this.account.address
    });
    await this.showToast({message: 'INFO.COPY_TO_CLIPBOARD_DONE'});
  }

  showQrCode() {
    if (this.qrCodeModal.isOpen) return; // Skip
    return this.qrCodeModal.present();
  }

  async onAccountChange(event: CustomEvent<{value: Account}>) {
    const account = event?.detail.value;
    if (account === WalletPage.NEW) {
      event.preventDefault();
      event.stopPropagation();

      const newAccount = await this.addNewWallet();

      // If cancelled, restore previous account
      if (!newAccount && this.address) {
        this.data = (this.$accounts.value || []).find(a => a.address === this.address);
        this.markForCheck();
      }
    }
    else {
      this.address = account.address;
    }
  }

  async addNewWallet(event?: UIEvent): Promise<Account> {
    const data = await this.authController.register();
    if (!data) return null;

    this.data = data;

    return data;
  }

  async openAuthModal(event?: UIEvent): Promise<Account|null> {
    event?.preventDefault();
    event?.stopPropagation();
    event?.stopImmediatePropagation();
    if (!this.authModal.isOpen) {
      await this.authModal.present();
    }
    const {data, role} = await this.authModal.onWillDismiss();
    if (!data?.address || role === 'CANCEL') {
      // Redirect to home
      await this.goHome();
      throw new Error("CANCELLED");
    }
    return data;
  }
}
