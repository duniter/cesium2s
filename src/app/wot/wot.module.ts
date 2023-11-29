import {NgModule} from '@angular/core';

import {WotLookupPage} from './wot-lookup.page';
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {WotRoutingModule} from "@app/wot/wot-routing.module";
import {WotDetailsPage} from "@app/wot/wot-details.page";
import {NgxJdenticonModule} from "ngx-jdenticon";

@NgModule({
  imports: [
    AppSharedModule,
    TranslateModule.forChild(),
    NgxJdenticonModule,
    WotRoutingModule
  ],
  declarations: [
    WotLookupPage,
    WotDetailsPage
  ],
  exports: [
    WotLookupPage,
    WotDetailsPage
  ]
})
export class WotModule {}
