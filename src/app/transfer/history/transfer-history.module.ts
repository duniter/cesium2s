import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppAccountModule } from '@app/account/account.module';
import { AppAuthModule } from '@app/account/auth/auth.module';
import { RouterModule } from '@angular/router';
import { TransferHistoryPage } from '@app/transfer/history/transfer-history.page';

@NgModule({
  imports: [AppSharedModule, AppAuthModule, TranslateModule.forChild(), RouterModule, AppAccountModule],
  declarations: [TransferHistoryPage],
  exports: [TransferHistoryPage],
})
export class AppTransferHistoryModule {
  constructor() {
    console.debug('[transfer-history] Creating module');
  }
}
