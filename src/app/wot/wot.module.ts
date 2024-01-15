import { NgModule } from '@angular/core';

import { WotLookupPage } from './wot-lookup.page';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { WotDetailsPage } from '@app/wot/wot-details.page';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { AppTransferModule } from '@app/transfer/transfer.module';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild(), NgxJdenticonModule, AppTransferModule],
  declarations: [WotLookupPage, WotDetailsPage],
  exports: [WotLookupPage, WotDetailsPage],
})
export class AppWotModule {
  constructor() {
    console.debug('[wot] Creating module');
  }
}
