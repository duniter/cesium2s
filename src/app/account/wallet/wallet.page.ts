import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';

import { Clipboard } from '@capacitor/clipboard';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account } from '@app/account/account.model';
import { isNil, isNotEmptyArray, isNotNil, isNotNilOrBlank } from '@app/shared/functions';
import { NetworkService } from '@app/network/network.service';
import { ActionSheetOptions, IonModal, IonPopover, ModalController, PopoverOptions } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { distinctUntilChanged, filter, mergeMap, switchMap } from 'rxjs/operators';
import { AccountsService } from '@app/account/accounts.service';
import { map, merge, Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { APP_TRANSFER_CONTROLLER, ITransferController, TransferFormOptions } from '@app/transfer/transfer.model';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { AppAccountModule } from '@app/account/account.module';
import { AppAuthModule } from '@app/account/auth/auth.module';
import { IdentityStatusEnum } from '@app/network/indexer/indexer-types.generated';
import { AppIdentityConfirmModule } from '@app/account/confirm/identity-confirm.module';
import { IdentityConfirmModal } from '@app/account/confirm/identity-confirm.modal';
import { fadeInOutAnimation, slideUpDownAnimation } from '@app/shared/animations';

export interface WalletState extends AppPageState {
  accounts: Account[];
  account: Account;
  address: string;
  currency: string;
  balance: number;
  receivedCertCount: number;
  givenCertCount: number;
  status: IdentityStatusEnum;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
  standalone: true,
  animations: [fadeInOutAnimation, slideUpDownAnimation],
  imports: [TranslateModule, AppSharedModule, AppAccountModule, AppAuthModule, AppIdentityConfirmModule],
})
export class WalletPage extends AppPage<WalletState> implements OnInit {
  static NEW = Object.freeze(<Account>{
    address: '',
  });

  IdentityStatusEnum = IdentityStatusEnum;

  protected qrCodeValue: string;
  protected qrCodeTitle: string;

  @RxStateProperty() accounts: Account[];
  @RxStateProperty() account: Account;
  @RxStateProperty() address: string;
  @RxStateProperty() currency: string;

  @RxStateSelect() account$: Observable<Account>;
  @RxStateSelect() accounts$: Observable<Account[]>;
  @RxStateSelect() receivedCertCount$: Observable<number>;
  @RxStateSelect() givenCertCount$: Observable<number>;
  @RxStateSelect() status$: Observable<IdentityStatusEnum>;

  get balance(): number {
    if (!this.account?.data) return undefined;
    return (this.account.data.free || 0) + (this.account.data.reserved || 0);
  }

  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet',
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
  };

  get new(): Account {
    return WalletPage.NEW;
  }

  @ViewChild('authModal') authModal: IonModal;
  @ViewChild('qrCodeModal') qrCodeModal: IonModal;
  @ViewChild('optionsPopover') optionsPopover: IonPopover;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected networkService: NetworkService,
    protected accountService: AccountsService,
    protected modalCtrl: ModalController,
    @Inject(APP_TRANSFER_CONTROLLER) protected transferController: ITransferController
  ) {
    super({
      name: 'wallet-page',
      loadDueTime: accountService.started ? 0 : 250,
    });

    // Watch address from route or account
    this._state.connect(
      'address',
      merge(this.route.paramMap.pipe(map((paramMap) => paramMap.get('address'))), this.account$.pipe(map((a) => a?.address)))
        .pipe(filter(isNotNilOrBlank))
        .pipe(distinctUntilChanged())
    );

    // Watch accounts
    this._state.connect('accounts', this.accountService.watchAll());

    // Add new wallet
    this._state.hold(this.account$.pipe(filter((account) => account === WalletPage.NEW)), () => this.addNewWallet());

    // Load by address
    this._state.connect(
      'account',
      this._state.$.pipe(
        filter((s) => isNotEmptyArray(s.accounts) && isNil(s.account) && isNotNilOrBlank(s.address)),
        // TODO find a way to avoid multiple call, on address='default'
        //distinctUntilKeyChanged('address'),
        mergeMap(async (s) => {
          console.debug(this._logPrefix + 'Loading account from address: ' + s.address);

          let account: Account;
          if (s.address === 'default') {
            account = await this.accountService.getDefault({ withMembership: true });
            console.debug(this._logPrefix + 'Loaded account by default', account);
            return account;
          }

          // Load by address
          const exists = await this.accountService.isAvailable(s.address);
          if (exists) {
            account = await this.accountService.getByAddress(s.address, { withMembership: true });
            console.debug(this._logPrefix + 'Loaded account by address', account);
            return account;
          }

          // Try by name
          account = await this.accountService.getByName(s.address, { withMembership: true });
          console.debug(this._logPrefix + 'Loaded account by name', account);
          return account;
        })
      )
    );

    // Watch recieved/given certs
    const validAddress$ = this.account$.pipe(
      map((account) => account?.address),
      filter(isNotNilOrBlank)
    );
    this._state.connect(
      'receivedCertCount',
      validAddress$.pipe(
        switchMap((address) => this.networkService.indexer.certsSearch({ receiver: address }, { first: 0 })),
        map(({ total }) => total)
      )
    );
    this._state.connect(
      'givenCertCount',
      validAddress$.pipe(
        switchMap((address) => this.networkService.indexer.certsSearch({ issuer: address }, { first: 0 })),
        map(({ total }) => total)
      )
    );

    this._state.connect(
      'status',
      this.account$.pipe(
        map((account) => account?.meta?.status),
        filter(isNotNil)
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
    this.optionsPopover?.dismiss();

    const data = await this.accountService.createNew();
    if (!data) return null;

    this.account = data;

    return data;
  }

  transfer(opts?: TransferFormOptions) {
    return this.transferController.transfer({ account: this.account, ...opts });
  }

  get isUnconfirmed() {
    return this.account.meta?.status == IdentityStatusEnum.Unconfirmed;
  }

  async confirmIdentity(): Promise<void> {
    console.info(`${this._logPrefix}Opening identity confirm modal...`);

    const modal = await this.modalCtrl.create({
      component: IdentityConfirmModal,
      presentingElement: this._presentingElement,
      canDismiss: true,
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (!data || role === 'CANCEL') {
      console.info(`${this._logPrefix}User cancelled identity confirmation`);
      this.markAsLoaded();
      return;
    }

    console.info(`${this._logPrefix}User confirmed. Pseudo: ${data.pseudo}`);
    this.markAsLoading();

    try {
      await this.showToast({ id: 'confirm-identity', message: 'INFO.CONFIRM_IDENTITY_PENDING', duration: -1 });

      // Send confirmation
      await this.accountService.confirm(this.account, data.pseudo);

      // Show toast
      await this.showToast({ id: 'confirm-identity', message: 'INFO.CONFIRM_IDENTITY_DONE', swipeGesture: 'vertical', color: 'secondary' });
    } catch (err) {
      this.showErrorToast(err, { id: 'confirm-identity' });
      this.markAsLoaded();
    }
  }
}
