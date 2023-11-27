import { Component, Injector, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ModalController } from '@ionic/angular';
import {Account} from "@app/wallet/account.model";

interface AccountDetailModalState {
  account: Account;
}

@Component({
  selector: 'app-account-detail-modal',
  templateUrl: './account-detail.modal.html',
  styleUrls: ['./account-detail.modal.scss'],
})
export class AccountDetailModal {
  constructor(protected injector: Injector, protected state: RxState<AccountDetailModalState>, protected modalController: ModalController) {}

  get account(): Account {
    return this.state.get('account');
  }

  @Input() set account(value: Account) {
    this.state.set('account', () => value);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
