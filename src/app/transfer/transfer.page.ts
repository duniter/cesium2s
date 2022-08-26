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
import {Account, AccountUtils} from "@app/wallet/account.model";
import {IonModal} from "@ionic/angular";
import {
  BehaviorSubject,
  combineAll,
  combineLatestAll,
  concat,
  concatAll,
  from,
  Observable,
  Subject,
  switchMap,
  zip
} from "rxjs";
import {isNotNil} from "@app/shared/functions";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferPage extends BasePage<Observable<Account[]>> implements OnInit, OnDestroy {

  showComment: boolean;
  issuer: Partial<Account> = {};
  recipient: Partial<Account> = {};
  amount: number;

  @ViewChild('modal') modal: IonModal;

  get balance(): number {
    if (!this.issuer?.data) return undefined;
    return (this.issuer.data.free || 0) + (this.issuer.data.reserved || 0);
  }


  constructor(
    injector: Injector,
    protected accountService: AccountService,
    protected cd: ChangeDetectorRef
  ) {
    super(injector, {name: 'transfer'});
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    if (this.modal.isOpen) {
      this.modal.dismiss();
    }
  }

  protected async ngOnLoad(): Promise<Observable<Account[]>> {
    await this.accountService.ready();

    return this.accountService.watchAll({positiveBalanceFirst: true});
  }

  setRecipient(recipient: string|Account) {
    if (typeof recipient === 'object') {
      this.recipient.address = recipient.address;
      this.recipient.meta = recipient.meta;
    }
    else {
      this.recipient.address = recipient;
      this.recipient.meta = null;
    }
    this.markForCheck();
  }

  cancel(event?: UIEvent) {
    //
  }

  async submit(event?: UIEvent) {
    // Check valid
    if (!this.recipient || !this.issuer) return; // Skip

    this.resetError();

    try {
      const txHash = await this.accountService.transfer(this.issuer, this.recipient, this.amount);

      await this.showToast({message: 'INFO.TRANSFER_SENT'});
    }
    catch (err) {
      this.setError(err);
    }
  }
}
