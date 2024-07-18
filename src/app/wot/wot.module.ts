import { ModuleWithProviders, NgModule } from '@angular/core';

import { WotLookupPage } from './wot-lookup.page';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { WotDetailsPage } from '@app/wot/wot-details.page';
import { AppTransferModule } from '@app/transfer/send/transfer.module';
import { AppAccountModule } from '@app/account/account.module';
import { WotController } from './wot.controller';
import { APP_WOT_CONTROLLER } from './wot.model';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild(), AppTransferModule, AppAccountModule],
  declarations: [WotLookupPage, WotDetailsPage],
  exports: [WotLookupPage, WotDetailsPage],
})
export class AppWotModule {
  static forRoot(): ModuleWithProviders<AppTransferModule> {
    console.debug('[wot] Creating module');
    return {
      ngModule: AppWotModule,
      providers: [WotController, { provide: APP_WOT_CONTROLLER, useExisting: WotController }],
    };
  }
}
