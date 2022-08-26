import {AfterViewChecked, ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "./account.service";
import {Clipboard} from "@capacitor/clipboard";
import {BasePage} from "@app/shared/pages/base.page";
import {Account, AccountData} from "@app/wallet/account.model";
import {isEmptyArray, isNilOrBlank} from "@app/shared/functions";
import {keyring} from "@polkadot/ui-keyring";
import {NetworkService} from "@app/network/network.service";
import {BehaviorSubject} from "rxjs";
import {AuthModal} from "@app/auth/auth.modal";
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

  get loaded(): boolean {
    return !this.loading;
  }

  get balance(): number {
    if (!this.data?.data) return undefined;
    return (this.data.data.free || 0) + (this.data.data.reserved || 0);
  }

  get account(): Account {
    return this.data;
  }

  @ViewChild('authModal') authModal: IonModal;

  constructor(
    injector: Injector,
    protected router: Router,
    protected networkService: NetworkService,
    protected accountService: AccountService
  ) {
    super(injector, {name: 'wallet-page'})

    this.address = this.activatedRoute.snapshot.paramMap.get('address');
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewChecked() {

    // force page reload, when auth was previously cancelled
    if (!this.loading && !this.data) {
      setTimeout(() => this.load());
    }
  }

  protected async ngOnLoad(): Promise<Account> {

    this.currency = this.networkService.currencySign;

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
    await Clipboard.write({
      string: this.data?.address
    });
    await this.showToast({message: 'INFO.COPY_TO_CLIPBOARD_DONE'});
  }

  async openAuthModal(): Promise<Account|null> {
    if (!this.authModal.isOpen) {
      await this.authModal.present();
    }
    const {data, role} = await this.authModal.onDidDismiss();
    if (!data?.address) return null;
    return data;
  }
}
