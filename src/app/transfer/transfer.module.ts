import {ModuleWithProviders, NgModule} from '@angular/core';

import {TransferPage} from './transfer.page';
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {TransferPageRoutingModule} from "@app/transfer/transfer-routing.module";
import {WotModule} from "@app/wot/wot.module";
import {TransferController} from "@app/transfer/transfer.controller";

@NgModule({
  imports: [
      AppSharedModule,
      TranslateModule.forChild(),
      TransferPageRoutingModule,
      WotModule
  ],
  declarations: [
    TransferPage
  ]
})
export class AppTransferModule {
  static forRoot(): ModuleWithProviders<AppTransferModule> {
    console.info('[transfer] Creating module (root)');
    return {
      ngModule: AppTransferModule,
      providers: [
        TransferController
      ]
    };
  }
}
