import {NgModule} from '@angular/core';

import {WalletPage} from './wallet.page';
import {WalletPageRoutingModule} from "./wallet-routing.module";
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {AppAuthModule} from "@app/auth/auth.module";
import {AppUnlockModule} from "@app/unlock/unlock.module";
import {NgxJdenticonModule} from "ngx-jdenticon";
import {PushPipe} from "@rx-angular/template/push";

@NgModule({
    imports: [
        AppSharedModule,
        TranslateModule.forChild(),
        WalletPageRoutingModule,
        AppAuthModule,
        AppUnlockModule,
        NgxJdenticonModule
    ],
  declarations: [WalletPage]
})
export class AppWalletModule {}
