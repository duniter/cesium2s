import {AfterViewChecked, ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {AccountsService} from "./accounts.service";
import {Clipboard} from "@capacitor/clipboard";
import {BasePage} from "@app/shared/pages/base.page";
import {Account, AccountUtils} from "@app/wallet/account.model";
import {isEmptyArray, isNilOrBlank, isNotEmptyArray, isNotNil} from "@app/shared/functions";
import {NetworkService} from "@app/network/network.service";
import {IonModal} from "@ionic/angular";
import {Router} from "@angular/router";
import {RxState} from "@rx-angular/state";
import {filter, switchMap} from "rxjs/operators";
import {firstValueFrom} from "rxjs";

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

  readonly account$ = this._state.select('account');
  readonly accounts$ = this._state.select('accounts');

  get balance(): number {
    if (!this.account?.data) return undefined;
    return (this.account.data.free || 0) + (this.account.data.reserved || 0);
  }

  get accounts(): Account[] {
    return this._state.get('accounts');
  }
  get account(): Account {
    return this._state.get('account');
  }
  set account(account: Account) {
    this._state.set('account', (state) => account);
  }
  get address(): string {
    return this._state.get('address');
  }
  get currency(): string {
    return this._state.get('currency');
  }

  @ViewChild('authModal') authModal: IonModal;

  @ViewChild('qrCodeModal') qrCodeModal: IonModal;

  constructor(
    injector: Injector,
    protected router: Router,
    protected networkService: NetworkService,
    protected accountService: AccountsService
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
        this._state.set('account', (state) => account);
        this._state.set('address', (state) => account?.address);
      }

      // Load by address
      const isAddressAvailable = await this.accountService.isAvailable(s.address);
      if (isAddressAvailable) {
        const account = await this.accountService.getByAddress(s.address);
        this._state.set('account', (state) => account);
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

  async openAuthModal(): Promise<Account|null> {
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
