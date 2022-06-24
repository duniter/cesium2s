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
  exports: [
    WotLookupPage,
    WotDetailsPage
  ],
  declarations: [
    WotLookupPage,
    WotDetailsPage
  ]
})
export class WotModule {}
