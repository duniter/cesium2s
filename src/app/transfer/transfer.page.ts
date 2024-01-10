import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account, AccountUtils } from '@app/account/account.model';
import { ActionSheetOptions, IonModal, ModalController, Platform, PopoverOptions } from '@ionic/angular';
import { mergeMap, Observable, tap } from 'rxjs';
import { isNotEmptyArray, isNotNilOrBlank } from '@app/shared/functions';
import { filter } from 'rxjs/operators';
import { NetworkService } from '@app/network/network.service';
import { Currency } from '@app/network/currency.model';
import { NavigationEnd, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { Capacitor } from '@capacitor/core';
import { CapacitorPlugins } from '@app/shared/capacitor/plugins';
import { RxState } from '@rx-angular/state';
import { AccountsService } from '@app/account/accounts.service';
import { WotController } from '@app/wot/wot.controller';
import { TransferFormOptions } from '@app/transfer/transfer.model';
import { PredefinedColors } from '@ionic/core';

export interface TransferPageState extends AppPageState {
  currency: Currency;
  fee: number;
  accounts: Account[];
  account: Account;
  recipient: Partial<Account>;
  submitted: boolean;
}

export interface TransferPageInputs extends TransferFormOptions {
  dismissOnSubmit?: boolean;
  toolbarColor?: PredefinedColors;
}

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TransferPage extends AppPage<TransferPageState> implements TransferPageInputs, OnInit, OnDestroy {
  protected _enableScan: boolean = false;
  protected _autoOpenWotModal = true;
  protected _isModal: boolean;
  protected _initialWotModalBreakpoint = 0.25;

  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet',
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
    reference: 'event',
  };

  @RxStateSelect() protected currency$: Observable<Currency>;
  @RxStateSelect() protected fee$: Observable<number>;
  @RxStateSelect() protected accounts$: Observable<Account[]>;
  @RxStateSelect() protected account$: Observable<Account>;
  @RxStateSelect() protected recipient$: Observable<Partial<Account>>;
  @RxStateSelect() protected submitted$: Observable<boolean>;

  @Input() @RxStateProperty() currency: Currency;
  @Input() @RxStateProperty() fee: number;
  @Input() @RxStateProperty() account: Account = null;
  @Input() @RxStateProperty() recipient: Partial<Account>;
  @Input() @RxStateProperty() amount: number;

  @Input() showComment: boolean;
  @Input() dismissOnSubmit: boolean = false; // True is modal
  @Input() showToastOnSubmit: boolean = true;
  @Input() toolbarColor: PredefinedColors;

  @RxStateProperty() submitted: boolean;

  get accountName(): string {
    return AccountUtils.getDisplayName(this.account);
  }
  set accountName(value: string) {
    this.accountService.getByName(value).then((account) => (this.account = account));
  }

  @ViewChild('qrCodeModal') qrCodeModal: IonModal;

  get valid(): boolean {
    return this.amount > 0 && isNotNilOrBlank(this.account?.address) && isNotNilOrBlank(this.recipient?.address);
  }

  get invalid(): boolean {
    return !this.valid;
  }

  get paymentData(): string {
    return 'TODO';
  }

  constructor(
    protected ionicPlatform: Platform,
    protected accountService: AccountsService,
    protected networkService: NetworkService,
    protected modalCtrl: ModalController,
    protected wotCtrl: WotController,
    protected router: Router
  ) {
    super({
      name: 'transfer',
      loadDueTime: 250,
      initialState: {
        recipient: { address: null, meta: null },
      },
    });

    this._state.connect(
      'accounts',
      this.accountService
        .watchAll({ positiveBalanceFirst: true })
        // DEBUG
        .pipe(
          tap((accounts) => console.debug(this._logPrefix + 'Accounts loaded:', accounts)),
          mergeMap(async (accounts) => {
            // Load account
            const fromAddress = this.account?.address || this.activatedRoute.snapshot.paramMap.get('from');
            if (isNotNilOrBlank(fromAddress)) {
              this.account = await this.accountService.getByAddress(fromAddress);
            }
            // Get default
            else if (isNotEmptyArray(accounts)) {
              this.account = await this.accountService.getDefault();
            }

            // Load recipient
            const toAddress = this.recipient?.address || this.activatedRoute.snapshot.paramMap.get('to');
            if (isNotNilOrBlank(toAddress)) {
              this.recipient = <Account>{ address: toAddress };
            }
            return accounts;
          })
        )
    );

    this._state.connect('currency', this.networkService.currency$);

    this._state.connect('fee', this.currency$, (_, currency) => {
      return (currency?.fees?.tx || 0) / Math.pow(10, currency?.decimals || 0);
    });
  }

  async ngOnInit() {
    super.ngOnInit();
    this._isModal = !!(await this.modalCtrl.getTop()) && !this.routerOutlet;

    // Hide modal when leave page
    this.registerSubscription(
      this.router.events
        .pipe(
          filter((e) => this.loaded && e instanceof NavigationEnd),
          tap(() => console.debug(this._logPrefix + 'Resetting page...'))
        )
        .subscribe(() => this.unload())
    );
  }

  async ngOnDestroy() {
    super.ngOnDestroy();
    await this.qrCodeModal?.dismiss();
  }

  protected async ngOnLoad() {
    await this.accountService.ready();

    this._enableScan = this.ionicPlatform.is('capacitor') && Capacitor.isPluginAvailable(CapacitorPlugins.BarcodeScanner);

    return {};
  }

  async selectAccount(event: UIEvent) {
    event?.preventDefault();

    const account = await this.accountService.selectAccount({
      minBalance: this.amount || 0,
      positiveBalanceFirst: true,
      showBalance: true,
    });
    if (account) {
      this.account = account;
      this.markForCheck();
    }
  }

  setRecipient(recipient: string | Account) {
    console.log(this._logPrefix + 'Selected recipient: ', recipient);
    if (typeof recipient === 'object') {
      this.recipient = recipient;
    } else {
      this.recipient = { address: recipient, meta: null };
    }
  }

  cancel() {
    this.close();
  }

  async doSubmit() {
    // Check valid
    if (!this.recipient || !this.account) {
      this.markAsSubmitted();
      return;
    } // Skip

    this.markAsLoading();
    this.resetError();

    try {
      const hash = await this.accountService.transfer(this.account, this.recipient, this.amount);

      if (this.showToastOnSubmit) {
        await this.showToast({ message: 'INFO.TRANSFER_SENT' });
      }

      this.close(hash);
    } catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  async close(data?: string) {
    // As a page
    if (this.routerOutlet) {
      console.debug('[transfer] Closing page with result: ', data);
      if (this.routerOutlet?.canGoBack()) {
        this.routerOutlet.pop();
      } else {
        await this.router.navigateByUrl('/wallet');
      }
    }
    // As a modal
    else {
      const modal = await this.modalCtrl.getTop();
      const hasModal = !!modal;
      if (hasModal) {
        this.modalCtrl.dismiss(data);
      }
    }

    return this.unload();
  }

  async openWotModal(event: Event) {
    event.preventDefault();

    const searchText = this.recipient?.address;
    const data = await this.wotCtrl.select({ searchText });

    if (!data) {
      console.log('TODO cancelled');
      return; // User cancelled
    }

    this.recipient = data;
  }

  async scanRecipient(event?: Event) {
    if (!this._enableScan) return; // SKip

    event?.preventDefault();

    this.markAsLoading();
    this.resetError();

    try {
      console.info('[transfer] Hide background');
      document.querySelector('body').classList.add('scanner-active');
      await BarcodeScanner.hideBackground(); // make background of WebView transparent

      // setTimeout(() => {
      //   console.info('[transfer] Stopping scanner...');
      // }, 5000);

      console.info('[transfer] Start scanning...');
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      // if the result has content
      if (result.hasContent) {
        this.setRecipient(result.content);
      }
    } catch (err) {
      console.error('[transfer] Failed to scan QR code: ' + (err?.message || ''), err);
      this.setError(err);
      this.markAsLoaded();
    } finally {
      document.querySelector('body').classList.remove('scanner-active');
    }
  }

  protected compareWith(a1: Account, a2: Account) {
    return a1 && a1.address === a2?.address;
  }

  protected async ngOnUnload() {
    console.debug('[transfer] Unloading page...');

    this.showComment = false;
    await this.qrCodeModal?.dismiss();

    return {
      ...(await super.ngOnUnload()),
      accounts: undefined,
      recipient: { address: null, meta: null },
    };
  }

  protected async unload(): Promise<void> {
    this.markAsPristine();
    return super.unload();
  }

  protected markAsSubmitted(opts = { emitEvent: true }) {
    if (!this.submitted) {
      this.submitted = true;
      if (opts.emitEvent !== false) this.markForCheck();
    }
  }

  protected markAsPristine(opts = { emitEvent: true }) {
    if (this.submitted) {
      this.submitted = false;
      if (opts.emitEvent !== false) this.markForCheck();
    }
  }
}
