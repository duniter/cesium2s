import {NgModule} from '@angular/core';

import {WalletPage} from './wallet.page';
import {WalletPageRoutingModule} from "./wallet-routing.module";
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    AppSharedModule,
    TranslateModule.forChild(),
    WalletPageRoutingModule
  ],
  declarations: [WalletPage]
})
export class WalletPageModule {}
