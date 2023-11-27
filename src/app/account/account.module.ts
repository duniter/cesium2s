import {NgModule} from '@angular/core';
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {AppAuthModule} from "@app/account/auth/auth.module";
import {AppUnlockModule} from "@app/account/unlock/unlock.module";
import {AppRegisterModule} from "@app/account/register/register.module";

@NgModule({
  imports: [
      AppSharedModule,
      TranslateModule.forChild(),
      AppAuthModule,
      AppRegisterModule,
      AppUnlockModule
  ],
  exports: [
    AppAuthModule,
    AppRegisterModule,
    AppUnlockModule
  ]
})
export class AppAccountModule {}
