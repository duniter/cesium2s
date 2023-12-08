import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account } from '@app/account/account.model';
import { Router } from '@angular/router';
import { WotService } from '@app/wot/wot.service';
import { AccountsService } from '@app/account/accounts.service';
import { Clipboard } from '@capacitor/clipboard';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { firstValueFrom, mergeMap, Observable } from 'rxjs';
import { RxState } from '@rx-angular/state';

export interface WotDetailsPageState extends AppPageState {
  account: Account;
}

@Component({
  selector: 'app-wot-details',
  templateUrl: './wot-details.page.html',
  styleUrls: ['./wot-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class WotDetailsPage extends AppPage<WotDetailsPageState> implements OnInit {
  address = this.activatedRoute.snapshot.paramMap.get('address');

  @Input() showToolbar = true;

  @RxStateProperty() account: Account;
  @RxStateSelect() account$: Observable<Account>;

  constructor(private router: Router, private accountService: AccountsService, private wotService: WotService) {
    super({ name: 'wot-details-page' });

    this._state.connect(
      'account',
      this.activatedRoute.paramMap.pipe(
        mergeMap(async (map) => {
          const address = map.get('address');

          await Promise.all([this.accountService.ready(), this.wotService.ready()]);

          const ownedAddress = await this.accountService.isAvailable(address);
          if (ownedAddress) {
            return this.accountService.getByAddress(this.address);
          }

          const data = await this.wotService.search({ address: this.address });

          return data ? data[0] : undefined;
        })
      )
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected async ngOnLoad(): Promise<WotDetailsPageState> {
    const account = await firstValueFrom(this.account$);
    return <WotDetailsPageState>{ account };
  }

  async copyAddress() {
    if (this.loading || !this.data?.account?.address) return; // Skip

    await Clipboard.write({
      string: this.account.address,
    });
    await this.showToast({ message: 'INFO.COPY_TO_CLIPBOARD_DONE' });
  }
}
