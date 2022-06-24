import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from "./account.service";
import {Clipboard} from "@capacitor/clipboard";
import {AccountData} from "./account.model";
import {BasePage} from "@app/shared/page/base.page";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPage extends BasePage<AccountData> implements OnInit {

  public walletId: string;

  get loaded(): boolean {
    return !this.loading;
  }

  constructor(
    injector: Injector,
    public  accountService: AccountService
  ) {
    super(injector, {name: 'wallet-page'})

    this.walletId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected ngOnLoad(): Promise<AccountData> {
    return this.accountService.getById(this.walletId);
  }

  async copyAddress() {
    await Clipboard.write({
      string: this.data?.address
    });
    await this.showToast({message: 'INFO.COPY_TO_CLIPBOARD_DONE'});
  }

}
