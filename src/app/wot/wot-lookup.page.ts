import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {AppPage, AppPageState} from "@app/shared/pages/base-page.class";
import {Account} from "@app/account/account.model";
import {Router} from "@angular/router";
import {WotService} from "@app/wot/wot.service";
import {WotSearchFilter, WotSearchFilterUtils} from "@app/wot/wot.model";
import {isNilOrBlank, isNotNilOrBlank, toBoolean} from "@app/shared/functions";
import {Observable} from "rxjs";
import {filter, switchMap, tap, debounceTime, distinctUntilChanged, mergeMap} from "rxjs/operators";

import {PredefinedColors} from "@app/shared/colors/colors.utils";
import {RxStateProperty, RxStateSelect} from "@app/shared/decorator/state.decorator";
import {RxState} from "@rx-angular/state";
import {ModalController} from "@ionic/angular";


export interface WotLookupState extends AppPageState {
  searchText: string;
  filter: WotSearchFilter;
  items: Account[];
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
  providers: [RxState]
})
export class WotLookupPage extends AppPage<WotLookupState> implements OnInit, WotLookupOptions {

  @RxStateSelect() protected items$: Observable<Account[]>;

  @Input() modal = false;
  @Input() debounceTime = 650;
  @Input() showToolbar = true;
  @Input() showSearchBar = true;
  @Input() showItemActions: boolean;
  @Input() toolbarColor: PredefinedColors = 'primary';
  @Input() @RxStateProperty() filter: WotSearchFilter;
  @Input() @RxStateProperty() searchText: string;

  @Output() searchClick = new EventEmitter<Event>();
  @Output() itemClick = new EventEmitter<Account>();
  @Output() closeClick = new EventEmitter<Account>();


  constructor(private router: Router,
              private wotService: WotService,
              private modalCtrl: ModalController
              ) {
    super({name: 'wot-lookup-page'});

    this._state.connect('filter',
      this._state.select('searchText').pipe(
        //filter(loading => loading === false),
        //switchMap(() => this._state.select('searchText')),
        distinctUntilChanged(),
        tap(() => this.markAsLoading()),
        debounceTime(this.debounceTime),
      ),
      (s, text) => {
        return {
          ...s.filter,
          text: isNilOrBlank(text) ? undefined : text,
          last: isNilOrBlank(text) ? s.filter?.last : undefined
        }
      });
    this._state.connect('items',
      this._state.select('filter').pipe(
        distinctUntilChanged(WotSearchFilterUtils.isEquals),
        mergeMap(filter => this.search(filter))
      ));
  }

  ngOnInit() {
    super.ngOnInit();
    this.showItemActions = toBoolean(this.showItemActions, !this.itemClick.observed);

    if (this.modal) {
      this.registerSubscription(
        this.itemClick.subscribe(item => this.modalCtrl.dismiss(item))
      )

      this.registerSubscription(
        this.closeClick.subscribe(() => this.modalCtrl.dismiss())
      )
    }
  }

  protected async ngOnLoad(): Promise<WotLookupState> {

    await this.wotService.ready();

    const filter = !WotSearchFilterUtils.isEmpty(this.filter) && this.filter
      || (isNotNilOrBlank(this.searchText) && {text:this.searchText})
      || {last: true};

    return <WotLookupState>{ filter };
  }

  async search(filter?: WotSearchFilter): Promise<Account[]> {
    this.log('search:', filter);

    try {
      return await this.wotService.search(filter);
    }
    catch (err) {
      this.setError(err);
    }
    finally {
      this.markAsLoaded();
    }
  }

  transfer(item: Account) {
    this.router.navigate(['/transfer', 'to', item.address]);
  }

  click(item: Account) {
    if (this.itemClick.observed) {
      this.itemClick.emit(item);
    }
    else {
      // Open
      this.router.navigate([item.address], {
        relativeTo: this.activatedRoute
      })
    }
  }

  public markAsLoading() {
    super.markAsLoading();
  }

  async searchChanged(event: CustomEvent, value: string) {
    if (!event || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();

    this.searchText = value;
  }
}
