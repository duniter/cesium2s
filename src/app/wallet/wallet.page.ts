import {AfterViewChecked, ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "./account.service";
import {Clipboard} from "@capacitor/clipboard";
import {BasePage} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";
import {isEmptyArray} from "@app/shared/functions";
import {NetworkService} from "@app/network/network.service";
import {BehaviorSubject} from "rxjs";
import {IonModal} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPage extends BasePage<Account> implements OnInit, AfterViewChecked {

  address: string;
  currency: string;

  $account = new BehaviorSubject<Account[]>(null);

  get account(): Account {
    return this.data;
  }

  @ViewChild('authModal') authModal: IonModal;
  @ViewChild('qrCodeModal') qrCodeModal: IonModal;

  constructor(
    injector: Injector,
    protected router: Router,
    protected networkService: NetworkService,
    protected accountService: AccountService
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

    const accounts = await this.accountService.getAll();
    this.$account.next(accounts);

    if (isEmptyArray(accounts)) {
      const account = await this.openAuthModal();
      // Redirect to home
      if (!account) {
        await this.router.navigateByUrl('/home');
        throw new Error('ERROR.AUTH_REQUIRED');
      }

      this.$account.next([account]);
      return account;
    }

    if (this.address === 'default') {
      const account = await this.accountService.getDefault();
      this.address = account.address;
      return account;
    }

    // Load by address
    const isAddressAvailable = await this.accountService.isAvailable(this.address);
    if (isAddressAvailable) {
      return this.accountService.getByAddress(this.address);
    }

    // Try by name
    return this.accountService.getByName(this.address);
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

  addNewWallet(event: UIEvent) {

  }

  async openAuthModal(): Promise<Account|null> {
    if (!this.authModal.isOpen) {
      await this.authModal.present();
    }
    const {data, role} = await this.authModal.onWillDismiss();
    if (!data?.address) return null;
    return data;
  }
}
