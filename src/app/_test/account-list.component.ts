import { Component, Injector, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ModalController } from '@ionic/angular';
import { AccountDetailModal } from './account-detail.modal';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import {Account} from "@app/wallet/account.model";
import {RxStateProperty, RxStateRegister} from "@app/shared/decorator/state.decorator";
import {AccountService} from "@app/wallet/account.service";

interface AccountListComponentState {
  accounts: Account[];
}

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  providers: [RxState],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0, transform: 'translateY(100%) translateX(100%)' }), { optional: true }),
        query(':enter', stagger('200ms', [animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))]), { optional: true }),
      ]),
    ]),
  ],
})
export class AccountListComponent {
  @RxStateRegister() protected state: RxState<AccountListComponentState>;

  constructor(protected accountService: AccountService,
              protected modalController: ModalController) {

    accountService.accounts
    this.accounts = [
      {address: 'tototototototot', meta: {name: 'portefeuille 1'}},
      {address: 'totosstototot', meta: {name: 'portefeuille 2'}},
    ]
  }

  @Input() @RxStateProperty() accounts: Account[];

  async showAccountDetail(account: Account) {
    const modal = await this.modalController.create({
      component: AccountDetailModal,
      componentProps: { account },
    });

    return await modal.present();
  }
}
