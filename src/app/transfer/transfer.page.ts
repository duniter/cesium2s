import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {AccountService} from "../wallet/account.service";
import {BasePage} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";
import {ActionSheetOptions, IonModal, PopoverOptions} from "@ionic/angular";
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {isNotEmptyArray, isNotNilOrBlank} from "@app/shared/functions";
import {filter} from "rxjs/operators";
import {WotLookupPage} from "@app/wot/wot-lookup.page";
import {NetworkService} from "@app/network/network.service";
import {Currency} from "@app/network/currency.model";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferPage extends BasePage<Observable<Account[]>> implements OnInit, OnDestroy {

  showComment: boolean;
  issuer: Account = null;
  recipient: Account = {address: null, meta: null};
  amount: number;
  fee: number;

  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet'
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
    reference: 'event'
  };

  @ViewChild('modal') modal: IonModal;

  get balance(): number {
    if (!this.issuer?.data) return undefined;
    return (this.issuer.data.free || 0) + (this.issuer.data.reserved || 0);
  }

  get currency(): Currency {
    return this.networkService.currency;
  }

  get valid(): boolean {
    const valid = this.amount > 0 && isNotNilOrBlank(this.issuer?.address) && isNotNilOrBlank(this.recipient?.address);
    console.log(valid);
    return valid;
  }

  get invalid(): boolean {
    return !this.valid;
  }

  constructor(
    injector: Injector,
    protected accountService: AccountService,
    protected networkService: NetworkService,
    protected cd: ChangeDetectorRef
  ) {
    super(injector, {name: 'transfer', loadDueTime: 250});
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.modal.isOpen) {
      this.modal.dismiss();
    }
  }

  protected async ngOnLoad(): Promise<Observable<Account[]>> {
    await this.accountService.ready();

    const subject = new BehaviorSubject<Account[]>(null);
    this.registerSubscription(
      this.accountService.watchAll({positiveBalanceFirst: true})
        .pipe(filter(isNotEmptyArray))
        .subscribe((value) => subject.next(value))
    );

    const accounts = await firstValueFrom(subject);

    // Load issuer
    const issuerAddress = this.activatedRoute.snapshot.paramMap.get('from');
    if (isNotNilOrBlank(issuerAddress)) {
      this.issuer = (accounts||[]).find(a => a.address === issuerAddress);
    }
    // Only one account: select it
    else if (accounts?.length === 1) {
      this.issuer = accounts[0];
    }

    // Load receiver
    const receiverAddress = this.activatedRoute.snapshot.paramMap.get('to');
    if (isNotNilOrBlank(receiverAddress)) {
      this.recipient.address = receiverAddress;
    }

    this.fee = (this.networkService.currency?.fees.tx || 0) / Math.pow(10, this.networkService.currency?.decimals || 0);

    return subject;
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

  protected compareWith(a1: Account, a2: Account) {
    return a1.address === a2.address;
  }

  protected reset() {
    this.showComment = false;
    this.issuer = null;
    this.recipient = {address: null, meta: null};
    this.amount = null;
    this.markAsLoaded();
    this.markForCheck();
  }
}
