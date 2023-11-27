import {ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';

import {BasePage, BasePageState} from "@app/shared/pages/base.page";
import {Account} from "@app/account/account.model";
import {Router} from "@angular/router";
import {WotService} from "@app/wot/wot.service";
import {WotSearchFilter} from "@app/wot/wot.model";
import {toBoolean} from "@app/shared/functions";
import {debounceTime, mergeMap, Observable} from "rxjs";
import {RxState} from "@rx-angular/state";
import {PredefinedColors} from "@app/shared/colors/colors.utils";
import {RxStateSelect} from "@app/shared/decorator/state.decorator";


export interface WotLookupState extends BasePageState {
  searchText: string;
  filter: WotSearchFilter;
  items: Account[];
}

@Component({
  selector: 'app-wot-lookup',
  templateUrl: './wot-lookup.page.html',
  styleUrls: ['./wot-lookup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WotLookupPage extends BasePage<WotLookupState> implements OnInit {

  @Input() debounceTime = 650;
  @Input() showToolbar = true;
  @Input() showSearchBar = true;
  @Output() searchClick = new EventEmitter<Event>();
  @Output() itemClick = new EventEmitter<Account>();

  @Input() showItemActions: boolean;
  @Input() toolbarColor: PredefinedColors = 'primary';

  @RxStateSelect() items$: Observable<Account[]>;

  constructor(injector: Injector,
              private router: Router,
              private wotService: WotService
              ) {
    super(injector, {name: 'wot-lookup-page'});

    this._state.connect('filter',
      this._state.select('searchText')
        .pipe(debounceTime(this.debounceTime)),
      (s, text) => {
          return {
            ...s.filter,
            text
          }
        });
    this._state.connect('items',
      this._state.select('filter').pipe(
        mergeMap(filter => this.search(filter))
      ));
  }

  ngOnInit() {
    super.ngOnInit();
    this.showItemActions = toBoolean(this.showItemActions, !this.itemClick.observed);
  }

  protected async ngOnLoad(): Promise<WotLookupState> {

    await this.wotService.ready();

    const items = await this.search({last: true})

    return <WotLookupState>{
      searchText: null,
      filter: {},
      items
    };
  }

  async search(filter?: WotSearchFilter): Promise<Account[]> {
    this.log('search:', arguments);

    this.markAsLoading();

    try {
      return await this.wotService.search(filter);
    }
    catch (err) {
      this.setError(err);
    }
    finally {
      this.markAsLoaded();
      this.markForCheck();
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

  async searchChanged(event: CustomEvent<any>, value: string) {
    if (!event || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();

    this._state.set('searchText', (_) => value);
  }
}
