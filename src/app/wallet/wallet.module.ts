import {NgModule} from '@angular/core';

import {WalletPage} from './wallet.page';
import {WalletPageRoutingModule} from "./wallet-routing.module";
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {AppAuthModule} from "@app/account/auth/auth.module";
import {AppUnlockModule} from "@app/account/unlock/unlock.module";
import {NgxJdenticonModule} from "ngx-jdenticon";
import {AppAccountModule} from "@app/account/account.module";

@NgModule({
    imports: [
        AppSharedModule,
        TranslateModule.forChild(),
        WalletPageRoutingModule,
        AppAccountModule,
        NgxJdenticonModule
    ],
  declarations: [WalletPage]
})
export class AppWalletModule {}
