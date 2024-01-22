import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account, AccountUtils } from '@app/account/account.model';
import { arraySize, isNil, isNotEmptyArray, isNotNilOrBlank, toNumber } from '@app/shared/functions';
import { NetworkService } from '@app/network/network.service';
import { ActionSheetOptions, InfiniteScrollCustomEvent, IonModal, PopoverOptions, RefresherCustomEvent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AccountsService } from '@app/account/accounts.service';
import { firstValueFrom, merge, Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { APP_TRANSFER_CONTROLLER, ITransferController, Transfer, TransferFormOptions } from '@app/transfer/transfer.model';
import { IndexerService } from '@app/network/indexer.service';
import { FetchMoreFn, LoadResult } from '@app/shared/services/service.model';
import { Certification, CertificationSearchFilter, CertificationSearchFilterUtils } from '@app/certification/certification.model';

export interface CertHistoryPageState extends AppPageState {
  accounts: Account[];
  account: Account;
  owner: boolean; // is owned by user ?
  address: string;
  currency: string;

  title: string;
  filter: CertificationSearchFilter;
  limit: number;
  items: Certification[];
  count: number;
  canFetchMore: boolean;
  fetchMoreFn: FetchMoreFn<LoadResult<Certification>>;
}

@Component({
  selector: 'app-cert-history',
  templateUrl: './cert-history.page.html',
  styleUrls: ['./cert-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class CertHistoryPage extends AppPage<CertHistoryPageState> implements OnInit {
  @RxStateSelect() protected items$: Observable<Transfer[]>;
  @RxStateSelect() protected count$: Observable<number>;
  @RxStateSelect() protected accounts$: Observable<Account[]>;
  @RxStateSelect() protected account$: Observable<Account>;
  @RxStateSelect() protected address$: Observable<string>;
  @RxStateSelect() protected owner$: Observable<boolean>;
  @RxStateSelect() protected canFetchMore$: Observable<boolean>;
  @RxStateSelect() protected title$: Observable<string>;

  @RxStateProperty() currency: string;
  @RxStateProperty() accounts: Account[];
  @RxStateProperty() account: Account;
  @RxStateProperty() address: string;
  @RxStateProperty() count: number;
  @RxStateProperty() fetchMoreFn: FetchMoreFn<LoadResult<Certification>>;
  @RxStateProperty() canFetchMore: boolean;

  @Input() @RxStateProperty() filter: CertificationSearchFilter;
  @Input() @RxStateProperty() limit: number;

  @Output() refresh = new EventEmitter<RefresherCustomEvent>();

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
    protected indexer: IndexerService,
    protected accountService: AccountsService,
    @Inject(APP_TRANSFER_CONTROLLER) protected transferController: ITransferController
  ) {
    super({
      name: 'cert-history-page',
      loadDueTime: accountService.started ? 0 : 250,
      initialState: {
        canFetchMore: false,
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
                const { data } = await firstValueFrom(this.indexer.wotSearch({ address }, { limit: 1 }));
                if (data?.length) return data[0];
                throw err;
              }
            } else {
              return (await firstValueFrom(this.indexer.wotSearch({ address }, { limit: 1 })))?.[0];
            }
          })
        )
    );

    // Title
    this._state.connect(
      'title',
      this.account$.pipe(
        map(AccountUtils.getDisplayName),
        switchMap((accountName) => this.translate.get('WOT.CERTIFICATIONS.TITLE', { uid: accountName }))
      )
    );

    // Create filter
    this._state.connect(
      'filter',
      this.address$.pipe(
        filter((address) => address && address !== 'default'),
        map((address) => <CertificationSearchFilter>{ issuer: address })
      )
    );

    // Load items
    this._state.connect(
      'items',
      merge(
        this.refresh.pipe(
          filter(() => !this.loading),
          map(() => ({ filter: this.filter, limit: this.limit }))
        ),
        this._state.select(['filter', 'limit', 'account'], (res) => res, {
          filter: CertificationSearchFilterUtils.isEquals,
          limit: (l1, l2) => l1 === l2,
          account: AccountUtils.isEquals,
        })
      ).pipe(
        filter(({ filter }) => !CertificationSearchFilterUtils.isEmpty(filter)),
        mergeMap(({ filter, limit }) => this.search(filter, { offset: 0, limit })),
        map(({ data, fetchMore }) => {
          this.fetchMoreFn = fetchMore;
          this.canFetchMore = !!fetchMore;
          return data;
        })
      )
    );

    this._state.connect('count', this.items$.pipe(map(arraySize)));
  }

  async ngOnInit() {
    console.info(this._logPrefix + 'Initializing...');
    super.ngOnInit();

    this.limit = toNumber(this.limit, 15);
  }

  search(searchFilter?: CertificationSearchFilter, options?: { limit: number; offset: number }): Observable<LoadResult<Certification>> {
    try {
      this.markAsLoading();

      return this.indexer.certsSearch(searchFilter, options).pipe(
        filter(() => CertificationSearchFilterUtils.isEquals(this.filter, searchFilter)),
        tap(() => this.markAsLoaded())
      );
    } catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  protected async ngOnLoad(): Promise<CertHistoryPageState> {
    await this.accountService.ready();

    return <CertHistoryPageState>{
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
    // Wait end of current load
    await this.waitIdle();

    if (this.canFetchMore) {
      console.debug(this._logPrefix + 'Fetching more items...');

      let { data, fetchMore } = await this.fetchMoreFn();

      // Fetch more again, since we fetch using a timestamp
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
    }

    if (event?.target && event.target.complete) {
      await event.target.complete();
    }
  }

  async doRefresh(event?: RefresherCustomEvent) {
    this.refresh.emit(event);

    // When end of load
    await this.waitIdle();

    if (event?.target && event.target.complete) {
      await event.target.complete();
    }
  }
}
