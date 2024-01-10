import { Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { ModalController } from '@ionic/angular';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Account, SelectAccountOptions } from '@app/account/account.model';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { AccountsService } from '@app/account/accounts.service';
import { Observable } from 'rxjs';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';

interface AccountListComponentState extends AppPageState {
  accounts: Account[];
}

export interface AccountListComponentInputs extends SelectAccountOptions {}

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  providers: [RxState],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0, transform: 'translateY(100%) translateX(100%)' }), { optional: true }),
        query(':enter', stagger('200ms', [animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))]), {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class AccountListComponent extends AppPage<AccountListComponentState> implements AccountListComponentInputs {
  @Input() @RxStateProperty() accounts: Account[];
  @Input() minBalance: number;
  @Input() showBalance = false;
  @Input() positiveBalanceFirst = false;

  @RxStateSelect() accounts$: Observable<Account[]>;

  constructor(
    protected accountsService: AccountsService,
    protected modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this._state.connect(
      'accounts',
      this.accountsService.watchAll({ positiveBalanceFirst: this.positiveBalanceFirst })
      //.pipe(debounceTime(2000))
    );
  }

  protected async ngOnLoad(): Promise<Partial<AccountListComponentState>> {
    return {};
  }

  selectAccount(account: Account) {
    return this.modalController.dismiss(account);
  }

  cancel() {
    this.modalController.dismiss();
  }
}
