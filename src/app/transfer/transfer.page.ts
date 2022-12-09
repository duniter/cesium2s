import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {AccountsService} from "../wallet/accounts.service";
import {BasePage} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";
import {ActionSheetOptions, IonModal, Platform, PopoverOptions} from "@ionic/angular";
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {isNotEmptyArray, isNotNilOrBlank} from "@app/shared/functions";
import {filter} from "rxjs/operators";
import {WotLookupPage} from "@app/wot/wot-lookup.page";
import {NetworkService} from "@app/network/network.service";
import {Currency} from "@app/network/currency.model";
import {Router} from "@angular/router";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {BarcodeScannerWeb} from "@capacitor-community/barcode-scanner/dist/esm/web";
import {RxState} from "@rx-angular/state";

export interface TransferState {
  currency: Currency;
  fee: number;
  accounts: Account[];
  account: Account;
  recipient: Partial<Account>;

}
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferPage extends BasePage<TransferState> implements OnInit, OnDestroy {x

  showComment: boolean;
  amount: number;
  protected _capacitor: boolean;

  protected accounts$ = this._state.select('accounts');
  protected recipient$ = this._state.select('recipient');
  protected currency$ = this._state.select('currency');
  protected fee$ = this._state.select('fee');


  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet'
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
    reference: 'event'
  };

  @ViewChild('wotModal') wotModal: IonModal;
  @ViewChild('qrCodeModal') qrCodeModal: IonModal;

  get balance(): number {
    if (!this.issuer?.data) return undefined;
    return (this.issuer.data.free || 0) + (this.issuer.data.reserved || 0);
  }

  get currency(): Currency {
    return this.networkService.currency;
  }

  get valid(): boolean {
    return this.amount > 0
      && isNotNilOrBlank(this.issuer?.address)
      && isNotNilOrBlank(this.recipient?.address);
  }

  get invalid(): boolean {
    return !this.valid;
  }

  get paymentData(): string {
    return 'TODO';
  }

  get issuer() {
    return this._state.get('account');
  }
  set issuer(value: Account) {
    this._state.set('account', (_) => value);
  }

  get recipient() {
    return this._state.get('recipient');
  }
  set recipient(value: Partial<Account>) {
    this._state.set('recipient', (_) => value);
  }

  constructor(
    injector: Injector,
    protected ionicPlatform: Platform,
    protected accountService: AccountsService,
    protected networkService: NetworkService,
    protected router: Router,
    protected cd: ChangeDetectorRef
  ) {
    super(injector, {name: 'transfer', loadDueTime: 250});


    this._state.connect('accounts', this.accountService.watchAll({positiveBalanceFirst: true}));

    this._state.hold(this.accounts$, accounts => {
      // Load account
      const fromAddress = this.activatedRoute.snapshot.paramMap.get('from');
      if (isNotNilOrBlank(fromAddress)) {
        this.issuer = (accounts || []).find(a => a.address === fromAddress);
      }
      // Only one account: select it
      else if (accounts?.length === 1) {
        this.issuer = accounts[0];
      }

      // Load recipient
      const toAddress = this.activatedRoute.snapshot.paramMap.get('to');
      if (isNotNilOrBlank(toAddress)) {
        this.recipient = {address: toAddress};
      }
    });

    this._state.connect('fee', this.currency$, (state, currency) => {
      return (currency?.fees.tx || 0) / Math.pow(10, currency?.decimals || 0);
    });

    //this._state.hold(this.router.events)
  }

  ngOnInit() {
    super.ngOnInit();

    // Hide modal when leave page
    this.registerSubscription(
      this.router.events
        .pipe(filter(
          (value, index) => {
            this.log('Router event: ', value);
            return true;
          }
        )).subscribe()
    )
  }

  async ngOnDestroy() {
    super.ngOnDestroy();
    await this.wotModal?.dismiss();
    await this.qrCodeModal?.dismiss();
  }

  protected async ngOnLoad(): Promise<TransferState> {
    await this.accountService.ready();

    const currency = this.networkService.currency;
    this._capacitor = this.ionicPlatform.is('capacitor');

    return {
      currency,
      accounts: null,
      account: null,
      fee: null,
      recipient: {
        address: this.activatedRoute.snapshot.paramMap.get('to')
      }
    };
  }

  setRecipient(recipient: string|Account) {
    if (typeof recipient === 'object') {
      this.recipient = recipient;
    }
    else {
      this.recipient = {address: recipient, meta: null};
    }
    this.markForCheck();
  }

  cancel(event?: UIEvent) {
    this.reset();
  }

  async submit(event?: UIEvent) {
    // Check valid
    if (!this.recipient || !this.issuer) return; // Skip

    this.markAsLoading();
    this.resetError();

    try {
      await this.accountService.transfer(this.issuer, this.recipient, this.amount);

      await this.showToast({message: 'INFO.TRANSFER_SENT'});

      this.reset();
    }
    catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  async scanRecipient(event: UIEvent) {
    if (!this._capacitor) return; // SKip

    await BarcodeScanner.hideBackground(); // make background of WebView transparent

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      this.setRecipient(result.content);
    }
  }

  protected compareWith(a1: Account, a2: Account) {
    return a1.address === a2.address;
  }

  protected async reset() {
    this.showComment = false;
    this.issuer = null;
    this.recipient = {address: null, meta: null};
    this.amount = null;
    await this.wotModal?.dismiss();
    await this.qrCodeModal?.dismiss();
    this.markAsLoaded({emitEvent: false});
    this.markForCheck();
  }
}
