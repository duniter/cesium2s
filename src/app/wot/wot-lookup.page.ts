import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account } from '@app/account/account.model';
import { WotLookupOptions, WotSearchFilter, WotSearchFilterUtils } from '@app/wot/wot.model';
import { arraySize, isNilOrBlank, isNotNilOrBlank, toBoolean, toNumber } from '@app/shared/functions';
import { merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, tap } from 'rxjs/operators';

import { PredefinedColors } from '@app/shared/colors/colors.utils';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { RxState } from '@rx-angular/state';
import { InfiniteScrollCustomEvent, IonPopover, ModalController } from '@ionic/angular';

import { APP_TRANSFER_CONTROLLER, ITransferController } from '@app/transfer/transfer.model';
import { IndexerService } from '@app/network/indexer.service';
import { FetchMoreFn, LoadResult } from '@app/shared/services/service.model';
import { environment } from '@environments/environment';

export interface WotLookupState extends AppPageState {
  searchText: string;
  filter: WotSearchFilter;
  items: Account[];
  count: number;
  fetchSize: number;
  canFetchMore: boolean;
  fetchMoreFn: FetchMoreFn<LoadResult<Account>>;
  autoLoad: boolean;
}

export interface WotLookupInputs extends WotLookupOptions {
  isModal?: boolean;
}

@Component({
  selector: 'app-wot-lookup',
  templateUrl: './wot-lookup.page.html',
  styleUrls: ['./wot-lookup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class WotLookupPage extends AppPage<WotLookupState> implements OnInit, WotLookupInputs {
  @RxStateSelect() protected items$: Observable<Account[]>;
  @RxStateSelect() protected count$: Observable<number>;
  @RxStateSelect() protected filter$: Observable<WotSearchFilter>;
  @RxStateSelect() protected canFetchMore$: Observable<boolean>;

  @RxStateProperty() count: number;
  @RxStateProperty() fetchMoreFn: FetchMoreFn<LoadResult<Account>>;
  @RxStateProperty() canFetchMore: boolean;
  @Input() @RxStateProperty() fetchSize: number;

  @Input() isModal = false;
  @Input() debounceTime = 650;
  @Input() toolbarColor: PredefinedColors = 'primary';
  @Input() showToolbar = true;
  @Input() showSearchBar = true;
  @Input() showItemActions: boolean;
  @Input() showFilterButtons = true;
  @Input() @RxStateProperty() filter: WotSearchFilter;
  @Input() @RxStateProperty() searchText: string;
  @Input() @RxStateProperty() autoLoad: boolean;

  @Output() searchClick = new EventEmitter<Event>();
  @Output() itemClick = new EventEmitter<Account>();
  @Output() closeClick = new EventEmitter<Account>();
  @Output() refresh = new EventEmitter<Event>();

  @ViewChild('filterPopover') filterPopover: IonPopover;

  constructor(
    private indexerService: IndexerService,
    private modalCtrl: ModalController,
    @Inject(APP_TRANSFER_CONTROLLER) private transferController: ITransferController
  ) {
    super({ name: 'wot-lookup-page' });

    this._state.connect(
      'filter',
      this._state.select('searchText').pipe(
        distinctUntilChanged(),
        tap(() => this.autoLoad && this.markAsLoading()),
        debounceTime(this.mobile ? this.debounceTime : 0)
      ),
      (s, searchText) => {
        return {
          ...s.filter,
          searchText: isNilOrBlank(searchText) ? undefined : searchText,
          last: isNilOrBlank(searchText) ? toBoolean(s.filter?.last, true) : undefined,
        };
      }
    );
    this._state.connect(
      'items',
      merge(
        this.refresh.pipe(
          tap(() => this.markAsLoading()),
          debounceTime(100), // Wait filter to be update
          map(() => ({ filter: this.filter, fetchSize: this.fetchSize, autoLoad: true }))
        ),
        this._state.select(['filter', 'fetchSize', 'autoLoad'], (res) => res, {
          filter: WotSearchFilterUtils.isEquals,
          fetchSize: (l1, l2) => l1 === l2,
        })
      ).pipe(
        filter(({ autoLoad }) => autoLoad || this.mobile),
        filter(({ filter }) => !WotSearchFilterUtils.isEmpty(filter) && filter.address !== 'default'),
        mergeMap(({ filter, fetchSize }) => this.search(filter, { after: null, first: fetchSize })),
        map(({ data, fetchMore }) => {
          this.fetchMoreFn = fetchMore;
          this.canFetchMore = !!fetchMore;
          this.autoLoad = this.mobile;
          return data;
        })
      )
    );

    this._state.connect('count', this.items$.pipe(map(arraySize)));
  }

  ngOnInit() {
    super.ngOnInit();
    this.showItemActions = toBoolean(this.showItemActions, !this.itemClick.observed);
    this.showFilterButtons = toBoolean(this.showFilterButtons, true);
    this.autoLoad = toBoolean(this.autoLoad, this.showFilterButtons);
    this.fetchSize = toNumber(this.fetchSize, this.indexerService.fetchSize);

    if (!this.autoLoad) {
      this.loading = false;
      this.canFetchMore = false;
    }

    if (this.isModal) {
      this.registerSubscription(this.itemClick.subscribe((item) => this.modalCtrl.dismiss(item)));
      this.registerSubscription(this.closeClick.subscribe(() => this.modalCtrl.dismiss()));
    }
  }

  protected async ngOnLoad(): Promise<WotLookupState> {
    await this.indexerService.ready();

    const filter = (!WotSearchFilterUtils.isEmpty(this.filter) && this.filter) ||
      (isNotNilOrBlank(this.searchText) && { text: this.searchText }) || { last: true };

    const fetchSize = toNumber(this.fetchSize, this.indexerService.fetchSize || environment.graphql?.fetchSize || 10);

    return <WotLookupState>{ filter, fetchSize };
  }

  search(searchFilter?: WotSearchFilter, options?: { first: number; after: string }): Observable<LoadResult<Account>> {
    try {
      return this.indexerService.wotSearch(searchFilter, options).pipe(
        filter(() => WotSearchFilterUtils.isEquals(this.filter, searchFilter)),
        tap(() => this.markAsLoaded())
      );
    } catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }

  transferTo(event: UIEvent, recipient: Account) {
    event.preventDefault();
    return this.transferController.transfer({ recipient });
  }

  click(event: UIEvent, item: Account) {
    if (event.defaultPrevented) return; // Skip

    console.debug(`${this._logPrefix}Click on item`, item);

    if (this.itemClick.observed) {
      this.itemClick.emit(item);
    } else {
      return this.navController.navigateForward([item.address], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  async searchChanged(event: CustomEvent, value: string) {
    if (!event || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();

    this.searchText = value;
  }

  async clearSearch(event: UIEvent) {
    if (!event || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();

    if (!this.autoLoad && this.showFilterButtons) {
      this.applyFilter({ last: true, searchText: null });
      this.refresh.emit();
    }
  }

  async fetchMore(event?: InfiniteScrollCustomEvent) {
    // Wait end of current load
    await this.waitIdle();

    if (this.canFetchMore) {
      console.debug(this._logPrefix + 'Fetching more items, from offset: ' + this.count, event);
      const { data, fetchMore } = await this.fetchMoreFn();

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

  applyFilter(filter: Partial<WotSearchFilter>) {
    this._state.set(
      (s) =>
        <WotLookupState>{
          filter: {
            ...s.filter,
            ...filter,
          },
          autoLoad: true,
        }
    );
    this.filterPopover?.dismiss();
  }
}
