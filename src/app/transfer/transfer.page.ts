import {Component, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../wallet/account.service";
import {BasePage} from "@app/shared/pages/base.page";
import {UiAccount} from "@app/wallet/account.model";
import {IonModal} from "@ionic/angular";
import {from, Observable} from "rxjs";
import {isNotNil} from "@app/shared/functions";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage extends BasePage<Observable<UiAccount>[]> implements OnInit, OnDestroy {

  showComment: boolean;
  issuer: Partial<UiAccount> = {};
  recipient: Partial<UiAccount> = {};
  amount: number;

  @ViewChild('modal') modal: IonModal;

  constructor(
    injector: Injector,
    formBuilder: FormBuilder,
    public  wallet: AccountService,
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

  protected async ngOnLoad(): Promise<Observable<UiAccount>[]> {
    await this.wallet.ready();

    const accounts = await this.wallet.getAll();
    return accounts
      .map(a => a.meta?.name)
      .filter(isNotNil)
      .map(id => from(this.wallet.getById(id)));
  }

  setRecipient(recipient: string|UiAccount) {
    if (typeof recipient === 'object') {
      this.recipient.address = recipient.address;
      this.recipient.meta = recipient.meta;
    }
    else {
      this.recipient.address = recipient;
      this.recipient.meta = null;
    }
  }

  cancel() {
    //
  }

  submit() {
    // TODO send TX

  }
}
