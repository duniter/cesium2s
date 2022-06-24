import {ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';

import {BasePage} from "@app/shared/page/base.page";
import {AccountWithMeta, UiAccount} from "@app/wallet/account.model";
import {Router} from "@angular/router";
import {WotService} from "@app/wot/wot.service";
import {WotSearchFilter} from "@app/wot/wot.model";
import {toBoolean} from "@app/shared/functions";

@Component({
  selector: 'app-wot-lookup',
  templateUrl: './wot-lookup.page.html',
  styleUrls: ['./wot-lookup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WotLookupPage extends BasePage<UiAccount[]> implements OnInit {

  @Input() debounceTime = 650;
  @Input() showToolbar = true;
  @Input() showSearchBar = true;
  @Output() searchClick = new EventEmitter<Event>();
  @Output() itemClick = new EventEmitter<UiAccount>();

  @Input() showItemActions: boolean;

  constructor(injector: Injector,
              private router: Router,
              private wotService: WotService
              ) {
    super(injector, {name: 'wot-lookup-page'});
  }

  ngOnInit() {
    super.ngOnInit();
    this.showItemActions = toBoolean(this.showItemActions, !this.itemClick.observed);
  }

  protected async ngOnLoad(): Promise<UiAccount[]> {

    await this.wotService.ready();

    return this.search({last: true});
  }

  async search(filter?: WotSearchFilter): Promise<UiAccount[]> {
    this.log('search:', arguments);

    this.markAsLoading();

    try {
      this.data  = await this.wotService.search(filter);
      return this.data;
    }
    catch (err) {
      this.setError(err);
    }
    finally {
      this.markAsLoaded();
      this.markForCheck();
    }
  }

  transfer(item: AccountWithMeta | UiAccount) {
    this.router.navigate(['transfer'], {
      queryParams: {
        name: item.meta?.name,
        address: item.address
      }
    });
  }

  click(item: AccountWithMeta) {
    if (this.itemClick.observed) {
      this.itemClick.emit(item);
    }
    else {
      // Open
      this.router.navigate(['wot', ''])
    }
  }

  public markAsLoading() {
    super.markAsLoading();
  }

  searchChanged(event: CustomEvent<any>, value: string) {
    if (!event || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();

    this.search({text: value});
  }
}
