import {NgModule} from '@angular/core';

import {SettingsPage} from './settings.page';
import {AppSharedModule} from "@app/shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {SettingsPageRoutingModule} from "@app/settings/settings-routing.module";

@NgModule({
  imports: [
    AppSharedModule,
    TranslateModule.forChild(),
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
