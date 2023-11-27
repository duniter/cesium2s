import {ChangeDetectionStrategy, Component, Injector, Input, OnInit} from '@angular/core';

import {BasePage} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";
import {Router} from "@angular/router";
import {WotService} from "@app/wot/wot.service";
import {AccountsService} from "@app/wallet/accounts.service";
import {Clipboard} from "@capacitor/clipboard";

@Component({
  selector: 'app-wot-details',
  templateUrl: './wot-details.page.html',
  styleUrls: ['./wot-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WotDetailsPage extends BasePage<Account> implements OnInit {

  address = this.activatedRoute.snapshot.paramMap.get('address');

  @Input() showToolbar = true;

  constructor(injector: Injector,
              private router: Router,
              private accountService: AccountsService,
              private wotService: WotService
              ) {
    super(injector, {name: 'wot-details-page'});
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected async ngOnLoad(): Promise<Account> {

    await Promise.all([
      this.accountService.ready(),
      this.wotService.ready()
    ]);

    const ownedAddress = await this.accountService.isAvailable(this.address);
    if (ownedAddress) {
      return this.accountService.getByAddress(this.address);
    }

    const data = await this.wotService.search({address: this.address});

    return data[0];
  }


  async copyAddress() {
    if (this.loading || !this.data?.address) return; // Skip

    await Clipboard.write({
      string: this.data?.address
    });
    await this.showToast({message: 'INFO.COPY_TO_CLIPBOARD_DONE'});
  }

}
