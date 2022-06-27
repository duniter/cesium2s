import {NgModule} from '@angular/core';

import {HomePage} from './home.page';
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {HomePageRoutingModule} from "@app/home/home-routing.module";
import {AppAuthModule} from "@app/auth/auth.module";
import {AppRegisterModule} from "@app/register/register.module";

@NgModule({
  imports: [
    AppSharedModule,
    TranslateModule.forChild(),
    HomePageRoutingModule,
    AppAuthModule,
    AppRegisterModule
  ],
  declarations: [HomePage]
})
export class HomeModule {}
