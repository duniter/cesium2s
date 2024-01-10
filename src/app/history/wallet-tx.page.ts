import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account } from '@app/account/account.model';
import { arraySize, equals, isNil, isNotEmptyArray, isNotNilOrBlank, toNumber } from '@app/shared/functions';
import { NetworkService } from '@app/network/network.service';
import { ActionSheetOptions, IonModal, PopoverOptions } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { AccountsService } from '@app/account/accounts.service';
import { firstValueFrom, merge, Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';
import {
  APP_TRANSFER_CONTROLLER,
  ITransferController,
  Transfer,
  TransferFormOptions,
  TransferSearchFilter,
  TransferSearchFilterUtils,
} from '@app/transfer/transfer.model';
import { IndexerService } from '@app/network/indexer/indexer.service';
import { InfiniteScrollEvent } from '@app/shared/types';

export interface WalletTxState extends AppPageState {
  accounts: Account[];
  account: Account;
  owner: boolean; // is owned by user ?
  address: string;
  currency: string;
  balance: number;
  filter: TransferSearchFilter;
  items: Transfer[];
  count: number;
  limit: number;
  canFetchMore: boolean;
  enableInfiniteScroll: boolean;
}

@Component({
  selector: 'app-wallet-tx',
  templateUrl: './wallet-tx.page.html',
  styleUrls: ['./wallet-tx.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class WalletTxPage extends AppPage<WalletTxState> implements OnInit {
  @RxStateProperty() accounts: Account[];
  @RxStateProperty() account: Account;
  @RxStateProperty() address: string;
  @RxStateProperty() filter: TransferSearchFilter;
  @RxStateProperty() limit: number;
  @RxStateProperty() currency: string;

  @RxStateSelect() accounts$: Observable<Account[]>;
  @RxStateSelect() account$: Observable<Account>;
  @RxStateSelect() owner$: Observable<boolean>;
  @RxStateSelect() items$: Observable<Transfer[]>;
  @RxStateSelect() protected count$: Observable<number>;
  @RxStateSelect() protected enableInfiniteScroll$: Observable<boolean>;

  @RxStateProperty() count: number;
  @RxStateProperty() canFetchMore: boolean;

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

  @ViewChild('authModal') authModal: IonModal;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected networkService: NetworkService,
    protected indexerService: IndexerService,
    protected accountService: AccountsService,
    @Inject(APP_TRANSFER_CONTROLLER) protected transferController: ITransferController
  ) {
    super({
      name: 'wallet-tx-page',
      loadDueTime: accountService.started ? 0 : 250,
    });

    // Watch address from route or account
    this._state.connect(
      'address',
      merge(this.route.paramMap.pipe(map((paramMap) => paramMap.get('address'))), this.account$.pipe(map((a) => a?.address))).pipe(
        filter((address) => isNotNilOrBlank(address) && address !== this.address)
      )
    );

    // Watch accounts
    this._state.connect('accounts', this.accountService.watchAll());

    // Load by address
    this._state.connect(
      'account',
      this._state
        .select(['accounts', 'address'], (res) => res)
        .pipe(
          filter(({ address }) => isNil(this.account) && isNotNilOrBlank(address)),
          mergeMap(async ({ accounts, address }) => {
            console.debug(this._logPrefix + 'Loading account from address: ' + address);

            if (isNotEmptyArray(accounts)) {
              let account: Account;
              if (address === 'default') {
                account = await this.accountService.getDefault();
                return account;
              }

              // Load by address
              const exists = await this.accountService.isAvailable(address);
              if (exists) {
                return this.accountService.getByAddress(address);
              }

              // Try by name
              try {
                account = await this.accountService.getByName(address);
                return account;
              } catch (err) {
                const wotAccounts = await firstValueFrom(this.indexerService.wotSearch({ address }, { limit: 1 }));
                if (wotAccounts?.length) return wotAccounts[0];
                throw err;
              }
            } else {
              return (await firstValueFrom(this.indexerService.wotSearch({ address }, { limit: 1 })))?.[0];
            }
          })
        )
    );

    // Create filter
    this._state.connect('filter', this._state.select(['address'], (res) => res).pipe(map(({ address }) => <TransferSearchFilter>{ address })));

    // Load items
    this._state.connect(
      'items',
      this._state
        .select(['filter', 'limit'], (res) => res, {
          filter: TransferSearchFilterUtils.isEquals,
          limit: (l1, l2) => l1 === l2,
        })
        .pipe(
          filter(({ filter }) => !TransferSearchFilterUtils.isEmpty(filter) && filter.address !== 'default'),
          mergeMap(({ filter, limit }) => this.search(filter, { offset: 0, limit })),
          tap((items) => {
            this.canFetchMore = arraySize(items) === this.limit;
          })
        )
    );

    this._state.connect('count', this.items$.pipe(map(arraySize)));

    this._state.connect(
      'enableInfiniteScroll',
      this._state.select(['loading', 'canFetchMore'], (res) => res).pipe(map(({ loading, canFetchMore }) => !loading && canFetchMore))
    );
  }

  async ngOnInit() {
    console.info(this._logPrefix + 'Initializing...');
    super.ngOnInit();

    this.limit = toNumber(this.limit, 20);
  }

  search(searchFilter?: TransferSearchFilter, options?: { limit: number; offset: number }): Observable<Transfer[]> {
    try {
      return this.indexerService.transferSearch(searchFilter, options).pipe(
        filter(() => equals(this.filter, searchFilter)),
        tap(() => this.markAsLoaded())
      );
    } catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  protected async ngOnLoad(): Promise<WalletTxState> {
    await this.accountService.ready();

    return <WalletTxState>{
      account: null,
      address: this.activatedRoute.snapshot.paramMap.get('address'),
      currency: this.networkService.currencySymbol,
    };
  }

  transfer(opts?: TransferFormOptions) {
    return this.transferController.transfer({ account: this.account, modal: true, ...opts });
  }

  async showAccount(event: UIEvent, account: Account) {
    if (!account.address) return; // skip
    event.preventDefault();

    // Self account
    if (await this.accountService.isAvailable(account?.address)) {
      return this.navController.navigateRoot(['wallet', account.address]);
    } else {
      return this.navController.navigateForward(['wot', account.address]);
    }
  }

  async fetchMore(event?: InfiniteScrollEvent) {
    if (!this.canFetchMore || this.loading) return; // Skip

    console.debug(this._logPrefix + 'Fetching more, from offset: ' + this.count, event);
    const items = await firstValueFrom(this.search(this.filter, { limit: this.limit, offset: this.count }));
    if (items && event?.target && event.target.complete) {
      if (items.length) {
        this._state.set('items', (s) => [...s.items, ...items]);
        this.canFetchMore = items.length === this.limit;
      } else {
        this.canFetchMore = false;
      }
      event.target.complete();
    }
  }
}
