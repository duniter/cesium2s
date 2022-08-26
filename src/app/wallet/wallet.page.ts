import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {AccountService} from "./account.service";
import {Clipboard} from "@capacitor/clipboard";
import {BasePage} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPage extends BasePage<Account> implements OnInit {

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

  protected ngOnLoad(): Promise<Account> {
    return this.accountService.getById(this.walletId);
  }

  async copyAddress() {
    await Clipboard.write({
      string: this.data?.address
    });
    await this.showToast({message: 'INFO.COPY_TO_CLIPBOARD_DONE'});
  }

}
