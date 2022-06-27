import {ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';

import {BasePage} from "@app/shared/pages/base.page";
import {AccountWithMeta, UiAccount} from "@app/wallet/account.model";
import {Router} from "@angular/router";
import {WotService} from "@app/wot/wot.service";
import {WotSearchFilter} from "@app/wot/wot.model";

@Component({
  selector: 'app-wot-details',
  templateUrl: './wot-details.page.html',
  styleUrls: ['./wot-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WotDetailsPage extends BasePage<UiAccount> implements OnInit {

  address = this.activatedRoute.snapshot.paramMap.get('address');

  constructor(injector: Injector,
              private router: Router,
              private wotService: WotService
              ) {
    super(injector, {name: 'wot-details-page'});
  }

  ngOnInit() {
  }

  protected async ngOnLoad(): Promise<UiAccount> {

    await this.wotService.ready();

    const data = await this.wotService.search({address: this.address});

    return data[0];
  }

  transfer() {
    this.router.navigate(['transfer'], {
      queryParams: {
        address: this.data.address,
        name: this.data.meta?.name
      }
    });
  }

}
