import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "./account.service";
import {Clipboard} from "@capacitor/clipboard";
import {BasePage} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";
import {isEmptyArray} from "@app/shared/functions";
import {NetworkService} from "@app/network/network.service";
import {BehaviorSubject} from "rxjs";
import {ActionSheetOptions, IonModal, PopoverOptions} from "@ionic/angular";
import {Router} from "@angular/router";
import {WotLookupPage} from "@app/wot/wot-lookup.page";
import { AuthController } from '@app/auth/auth.controller';
import { firstNotNilPromise } from '@app/shared/observables';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPage extends BasePage<Account> implements OnInit, AfterViewChecked {

  static NEW = <Account>{
    address: ''
  };

  protected $accounts = new BehaviorSubject<Account[]>(null);
  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet'
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
    reference: 'event'
  };

  address: string;
  currency: string;


  get account(): Account {
    return this.data;
  }

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

    this.address = this.activatedRoute.snapshot.paramMap.get('address');
  }

  async ngOnInit() {
    console.info(this._logPrefix + 'Initializing...');
    super.ngOnInit();
  }

  ngAfterViewChecked() {

    // force page reload, when auth was previously cancelled
    if (!this.loading && !this.data) {
      this.info('Reloading page...');
      setTimeout(() => this.load());
    }
  }

  protected async ngOnLoad(): Promise<Account> {

    this.info('Loading page...');
    this.currency = this.networkService.currencySymbol;

    this.registerSubscription(
      this.accountService.watchAll()
      .subscribe(accounts => this.$accounts.next(accounts))
    );

    const accounts = await firstNotNilPromise<Account[]>(this.$accounts); // TODO add destroy/stop
    let account: Account;

    if (isEmptyArray(accounts)) {
      account = await this.openAuthModal();
      // Redirect to home
      if (!account) {
        await this.router.navigateByUrl('/home');
        throw new Error('ERROR.AUTH_REQUIRED');
      }
      this.address = account.address;
      this.$accounts.next([account]);
      return account;
    }

    if (this.address === 'default') {
      account = await this.accountService.getDefault();
      this.address = account.address;
      return account;
    }

    // Load by address
    const isAddressAvailable = await this.accountService.isAvailable(this.address);
    if (isAddressAvailable) {
      account = await this.accountService.getByAddress(this.address);
      this.address = account.address;
      return account;
    }

    // Try by name
    account = await this.accountService.getByName(this.address);
    // Redirect to home
    if (!account) {
      await this.router.navigateByUrl('/home');
      throw new Error('ERROR.AUTH_REQUIRED');
    }
    this.address =  account.address;
    return account;
  }

  async copyAddress() {
    if (this.loading || !this.data?.address) return; // Skip

    await Clipboard.write({
      string: this.data.address
    });
    await this.showToast({message: 'INFO.COPY_TO_CLIPBOARD_DONE'});
  }

  async showQrCode() {
    if (this.qrCodeModal.isOpen) return; // Skip
    this.qrCodeModal.present();
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
    if (!data?.address) return null;
    return data;
  }
}
