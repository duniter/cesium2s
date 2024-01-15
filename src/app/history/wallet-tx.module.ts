import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { AppAccountModule } from '@app/account/account.module';
import { AppAuthModule } from '@app/account/auth/auth.module';
import { RouterModule } from '@angular/router';
import { WalletTxPage } from '@app/history/wallet-tx.page';

@NgModule({
  imports: [AppSharedModule, AppAuthModule, TranslateModule.forChild(), RouterModule, AppAccountModule, NgxJdenticonModule],
  declarations: [WalletTxPage],
  exports: [WalletTxPage],
})
export class AppWalletTxModule {
  constructor() {
    console.debug('[wallet-tx] Creating module');
  }
}
