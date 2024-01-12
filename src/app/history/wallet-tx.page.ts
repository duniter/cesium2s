import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account } from '@app/account/account.model';
import { isNil, isNotEmptyArray, isNotNilOrBlank, toNumber } from '@app/shared/functions';
import { NetworkService } from '@app/network/network.service';
import { ActionSheetOptions, InfiniteScrollCustomEvent, IonModal, PopoverOptions } from '@ionic/angular';
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
import { IndexerService } from '@app/network/indexer.service';
import { FetchMoreFn, LoadResult } from '@app/shared/services/service.model';
import { firstFalsePromise } from '@app/shared/observables';

export interface WalletTxState extends AppPageState {
  accounts: Account[];
  account: Account;
  owner: boolean; // is owned by user ?
  address: string;
  currency: string;
  balance: number;
  filter: TransferSearchFilter;
  items: Transfer[];
  limit: number;
  canFetchMore: boolean;
  fetchMoreFn: FetchMoreFn<LoadResult<Transfer>>;
  disabledInfiniteScroll: boolean;
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
  @RxStateSelect() address$: Observable<string>;
  @RxStateSelect() owner$: Observable<boolean>;
  @RxStateSelect() items$: Observable<Transfer[]>;
  @RxStateSelect() protected canFetchMore$: Observable<boolean>;
  @RxStateSelect() protected disabledInfiniteScroll$: Observable<boolean>;

  @RxStateProperty() count: number;
  @RxStateProperty() fetchMoreFn: FetchMoreFn<LoadResult<Transfer>>;
  @RxStateProperty() canFetchMore: boolean;
  @RxStateProperty() disabledInfiniteScroll: boolean;

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
      initialState: {
        disabledInfiniteScroll: true,
      },
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
    this._state.connect(
      'filter',
      this.address$.pipe(
        filter((address) => address && address !== 'default'),
        map((address) => <TransferSearchFilter>{ address })
      )
    );

    // Load items
    this._state.connect(
      'items',
      this._state
        .select(['filter', 'limit'], (res) => res, {
          filter: (f1, f2) => TransferSearchFilterUtils.isEquals(f1, f2),
          limit: (l1, l2) => l1 === l2,
        })
        .pipe(
          filter(({ filter }) => !TransferSearchFilterUtils.isEmpty(filter)),
          mergeMap(({ filter, limit }) => this.search(filter, { offset: 0, limit })),
          map(({ data, fetchMore }) => {
            this.fetchMoreFn = fetchMore;
            this.canFetchMore = !!fetchMore;
            this.disabledInfiniteScroll = !fetchMore;
            return data;
          })
        )
    );
  }

  async ngOnInit() {
    console.info(this._logPrefix + 'Initializing...');
    super.ngOnInit();

    this.limit = toNumber(this.limit, 20);
  }

  search(searchFilter?: TransferSearchFilter, options?: { limit: number; offset: number }): Observable<LoadResult<Transfer>> {
    try {
      return this.indexerService.transferSearch(searchFilter, options).pipe(
        filter(() => TransferSearchFilterUtils.isEquals(this.filter, searchFilter)),
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

  async fetchMore(event?: InfiniteScrollCustomEvent) {
    await firstFalsePromise(this.loading$);

    if (this.canFetchMore) {
      console.debug(this._logPrefix + 'Fetching more...');

      let { data, fetchMore } = await this.fetchMoreFn(this.limit);

      while (data.length < this.limit && fetchMore) {
        const res = await fetchMore(this.limit);
        if (res.data?.length) data = [...data, ...res.data];
        fetchMore = res.fetchMore;
      }
      if (data?.length) {
        this._state.set('items', (s) => [...s.items, ...data]);
      }

      this.fetchMoreFn = fetchMore;
      this.canFetchMore = !!fetchMore;
      this.disabledInfiniteScroll = !fetchMore;
    }

    if (event?.target && event.target.complete) {
      event.target.complete();
    }
  }
}
