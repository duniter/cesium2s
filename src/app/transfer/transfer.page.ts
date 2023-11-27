import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {BasePage, BasePageState} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";
import {ActionSheetOptions, IonModal, IonTextarea, ModalController, Platform, PopoverOptions} from "@ionic/angular";
import {Observable} from "rxjs";
import {isNotNilOrBlank} from "@app/shared/functions";
import {filter} from "rxjs/operators";
import {NetworkService} from "@app/network/network.service";
import {Currency} from "@app/network/currency.model";
import {Router} from "@angular/router";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {RxStateProperty, RxStateSelect} from "@app/shared/decorator/state.decorator";
import {Capacitor} from "@capacitor/core";
import {CapacitorPlugins} from "@app/shared/capacitor/plugins";
import {RxState} from "@rx-angular/state";
import {AccountsService} from "@app/wallet/accounts.service";

export interface TransferState extends BasePageState {
  currency: Currency;
  fee: number;
  accounts: Account[];
  account: Account;
  recipient: Partial<Account>;
}

export interface TransferPageOptions {
  issuer?: Account;
  recipient?: Account;
  amount?: number;
  fee?: number;
  dismissOnSubmit?: boolean;
}

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferPage extends BasePage<TransferState> implements OnInit, OnDestroy {

  protected _enableScan: boolean = false;
  protected _autoOpenWotModal = true;
  protected _initialWotModalBreakpoint = 0.25

  @RxStateSelect() protected accounts$: Observable<Account[]>;
  @RxStateSelect() protected recipient$: Observable<Partial<Account>>;
  @RxStateSelect() protected currency$: Observable<Currency>;
  @RxStateSelect() protected fee$: Observable<number>;


  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet'
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
    reference: 'event'
  };

  @Input() @RxStateProperty() issuer: Account = null;
  @Input() @RxStateProperty() recipient: Partial<Account>;
  @Input() @RxStateProperty() amount: number;
  @Input() @RxStateProperty() fee: number;
  @Input() showComment: boolean;
  @Input() dismissOnSubmit: boolean = false; // True is modal
  @Input() showToastOnSubmit: boolean = true;

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


  constructor(
    injector: Injector,
    protected ionicPlatform: Platform,
    protected accountService: AccountsService,
    protected networkService: NetworkService,
    protected modalCtrl: ModalController,
    protected router: Router,
    protected cd: ChangeDetectorRef
  ) {
    super(injector, {name: 'transfer', loadDueTime: 250,
    initialState: {
      recipient: {address: null, meta: null}
    }});


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
        this.recipient = <Account>{address: toAddress};
      }
    });

    this._state.connect('fee', this.currency$, (state, currency) => {
      return (currency?.fees?.tx || 0) / Math.pow(10, currency?.decimals || 0);
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
            this.log('TODO Router event: ', value);
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

  protected async ngOnLoad() {
    await this.accountService.ready();

    this._enableScan = this.ionicPlatform.is('capacitor') && Capacitor.isPluginAvailable(CapacitorPlugins.BarcodeScanner);
    const currency = this.networkService.currency;

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


  protected async focusFrom(event: UIEvent, textarea?: IonTextarea) {

    if (this._autoOpenWotModal) {
      await this.showWotModal(event);

      if (textarea) {
        const el = await textarea.getInputElement();
        setTimeout( () => el.focus(), 250);
      }
    }

  }


  protected async showWotModal(event: UIEvent, breakpoint?: number) {
    breakpoint = breakpoint || 0.25;

    this._initialWotModalBreakpoint = breakpoint;

    if (!this.wotModal.isCmpOpen) {
      await this.wotModal.present();
    }

    // Set breakpoint
    if (breakpoint > 0.25){
      const currentBreakpoint = await this.wotModal.getCurrentBreakpoint();
      if (breakpoint > currentBreakpoint) {
        await this.wotModal.setCurrentBreakpoint(breakpoint);
      }
    }
  }

  protected async hideWotModal(event?: UIEvent) {
    if (this.wotModal && this.wotModal.isCmpOpen) {
      this._autoOpenWotModal = false;
      await this.wotModal.dismiss();
    }
  }


  setRecipient(recipient: string|Account): boolean {
    if (typeof recipient === 'object') {
      this.recipient = recipient;
    }
    else {
      this.recipient = {address: recipient, meta: null};
    }
    this.markForCheck();
    return true;
  }

  cancel(event?: UIEvent) {
    this.close();
  }

  async submit(event?: UIEvent) {
    // Check valid
    if (!this.recipient || !this.issuer) return; // Skip

    this.markAsLoading();
    this.resetError();

    try {
      const hash = await this.accountService.transfer(this.issuer, this.recipient, this.amount);

      if (this.showToastOnSubmit) {
        await this.showToast({message: 'INFO.TRANSFER_SENT'});
      }

      this.close(hash);

    }
    catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  async close(data?: any) {
    // As a page
    if (this.routerOutlet) {
      console.debug('[transfer] Closing page with result: ', data);
      if (this.routerOutlet?.canGoBack()) {
        this.routerOutlet.pop();
      }
      else {
        await this.router.navigateByUrl('/wallet');
      }
    }
    // As a modal
    else {
      // First close wot modal (if opened)
      await this.hideWotModal();

      const modal = await this.modalCtrl.getTop();
      const hasModal = !!modal;
      if (hasModal) {
        this.modalCtrl.dismiss(data);
      }
    }

    this.reset();
  }

  async scanRecipient(event: UIEvent) {
    if (!this._enableScan) return; // SKip

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
