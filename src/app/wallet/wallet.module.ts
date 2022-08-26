import {NgModule} from '@angular/core';

import {WalletPage} from './wallet.page';
import {WalletPageRoutingModule} from "./wallet-routing.module";
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {AppAuthModule} from "@app/auth/auth.module";

@NgModule({
  imports: [
    AppSharedModule,
    TranslateModule.forChild(),
    WalletPageRoutingModule,
    AppAuthModule
  ],
  declarations: [WalletPage]
})
export class WalletPageModule {}
