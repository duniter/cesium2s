import { NgModule } from '@angular/core';

import { WalletPage } from './wallet.page';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { AppAccountModule } from '@app/account/account.module';
import { AppAuthModule } from '@app/account/auth/auth.module';

@NgModule({
  imports: [TranslateModule.forChild(), AppSharedModule, AppAuthModule, AppAccountModule, NgxJdenticonModule],
  declarations: [WalletPage],
  exports: [WalletPage],
})
export class AppWalletModule {
  constructor() {
    console.debug('[wallet] Creating module');
  }
}
