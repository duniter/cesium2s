import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';

import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account } from '@app/account/account.model';
import { WotSearchFilter, WotSearchFilterUtils } from '@app/wot/wot.model';
import { arraySize, equals, isNilOrBlank, isNotNilOrBlank, toBoolean, toNumber } from '@app/shared/functions';
import { firstValueFrom, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, tap } from 'rxjs/operators';

import { PredefinedColors } from '@app/shared/colors/colors.utils';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { RxState } from '@rx-angular/state';
import { ModalController } from '@ionic/angular';

import { APP_TRANSFER_CONTROLLER, ITransferController } from '@app/transfer/transfer.model';
import { InfiniteScrollEvent } from '@app/shared/types';
import { IndexerService } from '@app/network/indexer/indexer.service';

export interface WotLookupState extends AppPageState {
  searchText: string;
  filter: WotSearchFilter;
  items: Account[];
  count: number;
  limit: number;
  canFetchMore: boolean;
  enableInfiniteScroll: boolean;
}

export interface WotLookupOptions {
  debounceTime?: number;
  showToolbar?: boolean;
  showSearchBar?: boolean;
  showItemActions?: boolean;
  toolbarColor?: PredefinedColors;
  searchText?: string;
  filter?: WotSearchFilter;
}

@Component({
  selector: 'app-wot-lookup',
  templateUrl: './wot-lookup.page.html',
  styleUrls: ['./wot-lookup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class WotLookupPage extends AppPage<WotLookupState> implements OnInit, WotLookupOptions {
  @RxStateSelect() protected items$: Observable<Account[]>;
  @RxStateSelect() protected count$: Observable<number>;
  @RxStateSelect() protected filter$: Observable<WotSearchFilter>;
  @RxStateSelect() protected enableInfiniteScroll$: Observable<boolean>;

  @RxStateProperty() count: number;
  @RxStateProperty() canFetchMore: boolean;

  @Input() modal = false;
  @Input() debounceTime = 650;
  @Input() showToolbar = true;
  @Input() showSearchBar = true;
  @Input() showItemActions: boolean;
  @Input() toolbarColor: PredefinedColors = 'primary';
  @Input() @RxStateProperty() filter: WotSearchFilter;
  @Input() @RxStateProperty() searchText: string;
  @Input() @RxStateProperty() limit: number;

  @Output() searchClick = new EventEmitter<Event>();
  @Output() itemClick = new EventEmitter<Account>();
  @Output() closeClick = new EventEmitter<Account>();

  constructor(
    private indexerService: IndexerService,
    private modalCtrl: ModalController,
    @Inject(APP_TRANSFER_CONTROLLER) private transferController: ITransferController
  ) {
    super({ name: 'wot-lookup-page' });

    this._state.connect(
      'filter',
      this._state.select('searchText').pipe(
        //filter(loading => loading === false),
        //switchMap(() => this._state.select('searchText')),
        distinctUntilChanged(),
        tap(() => this.markAsLoading()),
        debounceTime(this.debounceTime)
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
      this._state
        .select(['filter', 'limit'], (res) => res, {
          filter: WotSearchFilterUtils.isEquals,
          limit: (l1, l2) => l1 === l2,
        })
        .pipe(
          filter(({ filter }) => !WotSearchFilterUtils.isEmpty(filter) && filter.address !== 'default'),
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

  ngOnInit() {
    super.ngOnInit();
    this.showItemActions = toBoolean(this.showItemActions, !this.itemClick.observed);
    this.limit = toNumber(this.limit, 20);

    if (this.modal) {
      this.registerSubscription(this.itemClick.subscribe((item) => this.modalCtrl.dismiss(item)));
      this.registerSubscription(this.closeClick.subscribe(() => this.modalCtrl.dismiss()));
    }
  }

  protected async ngOnLoad(): Promise<WotLookupState> {
    await this.indexerService.ready();

    const filter = (!WotSearchFilterUtils.isEmpty(this.filter) && this.filter) ||
      (isNotNilOrBlank(this.searchText) && { text: this.searchText }) || { last: true };

    return <WotLookupState>{ filter };
  }

  search(searchFilter?: WotSearchFilter, options?: { limit: number; offset: number }): Observable<Account[]> {
    try {
      return this.indexerService.wotSearch(searchFilter, options).pipe(
        filter(() => equals(this.filter, searchFilter)),
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
      //      if (this.mobile) {
      // Open
      this.navController.navigateForward([item.address], {
        relativeTo: this.activatedRoute,
      });
      // } else {
      //   this.transferController.transfer({ recipient: item });
      // }
    }
  }

  async searchChanged(event: CustomEvent, value: string) {
    if (!event || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();

    this.searchText = value;
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

  applyFilter(filter: Partial<WotSearchFilter>) {
    this._state.set(
      'filter',
      (s) =>
        <WotSearchFilter>{
          ...s.filter,
          ...filter,
        }
    );
  }
}
