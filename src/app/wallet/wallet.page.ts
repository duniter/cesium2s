import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { Clipboard } from '@capacitor/clipboard';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account } from '@app/account/account.model';
import { isNil, isNotEmptyArray, isNotNilOrBlank } from '@app/shared/functions';
import { NetworkService } from '@app/network/network.service';
import { ActionSheetOptions, IonModal, PopoverOptions } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { filter, mergeMap } from 'rxjs/operators';
import { AccountsService } from '@app/account/accounts.service';
import { map, merge, Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';

export interface WalletState extends AppPageState {
  accounts: Account[];
  account: Account;
  address: string;
  currency: string;
  balance: number;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class WalletPage extends AppPage<WalletState> implements OnInit {
  static NEW = Object.freeze(<Account>{
    address: '',
  });

  protected qrCodeValue: string;
  protected qrCodeTitle: string;

  @RxStateProperty() accounts: Account[];
  @RxStateProperty() account: Account;
  @RxStateProperty() address: string;
  @RxStateProperty() currency: string;

  @RxStateSelect() account$: Observable<Account>;
  @RxStateSelect() accounts$: Observable<Account[]>;

  get balance(): number {
    if (!this.account?.data) return undefined;
    return (this.account.data.free || 0) + (this.account.data.reserved || 0);
  }

  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet',
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
    reference: 'event',
  };

  get new(): Account {
    return WalletPage.NEW;
  }

  @ViewChild('authModal') authModal: IonModal;
  @ViewChild('qrCodeModal') qrCodeModal: IonModal;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected networkService: NetworkService,
    protected accountService: AccountsService
  ) {
    super({
      name: 'wallet-page',
      loadDueTime: accountService.started ? 0 : 250,
    });

    // Watch address from route or account
    this._state.connect(
      'address',
      merge(
        this.route.paramMap.pipe(map((paramMap) => paramMap.get('address'))),
        this.account$.pipe(map((a) => a?.address))
      ).pipe(filter((address) => isNotNilOrBlank(address) && address !== this.address))
    );

    // Watch accounts
    this._state.connect('accounts', this.accountService.watchAll());

    // Add new wallet
    this._state.hold(this.account$.pipe(filter((account) => account === WalletPage.NEW)), () => this.addNewWallet());

    // Load by address
    this._state.connect(
      'account',
      this._state.$.pipe(
        filter(
          (s) =>
            isNotEmptyArray(s.accounts) &&
            isNil(s.account) &&
            isNotNilOrBlank(s.address) &&
            s.account !== WalletPage.NEW
        ),
        mergeMap(async (s) => {
          console.debug(this._logPrefix + 'Loading account from address: ' + s.address);

          let account: Account;
          if (s.address === 'default') {
            account = await this.accountService.getDefault();
            return account;
          }

          // Load by address
          const exists = await this.accountService.isAvailable(s.address);
          if (exists) {
            return this.accountService.getByAddress(s.address);
          }

          // Try by name
          account = await this.accountService.getByName(s.address);
          return account;
        })
      )
    );
  }

  async ngOnInit() {
    console.info(this._logPrefix + 'Initializing...');
    super.ngOnInit();
  }

  protected async ngOnLoad(): Promise<WalletState> {
    await this.accountService.ready();

    return <WalletState>{
      account: null,
      address: this.activatedRoute.snapshot.paramMap.get('address'),
      currency: this.networkService.currencySymbol,
    };
  }

  async copyToClipboard(event: Event, value: string) {
    if (this.loading || !this.account?.address || event?.defaultPrevented) return; // Skip

    await Clipboard.write({
      string: value,
    });
    await this.showToast({ message: 'INFO.COPY_TO_CLIPBOARD_DONE' });
  }

  showQrCode(event: Event, value: string, title: string) {
    if (this.qrCodeModal.isOpen) return; // Skip

    event?.preventDefault();
    this.qrCodeValue = value;
    this.qrCodeTitle = title;

    return this.qrCodeModal.present();
  }

  async addNewWallet(event?: Event): Promise<Account> {
    event?.preventDefault();
    event?.stopPropagation();

    const data = await this.accountService.createNew();
    if (!data) return null;

    this.account = data;

    return data;
  }
}
