import { NgModule } from '@angular/core';

import { SettingsPage } from './settings.page';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild()],
  declarations: [SettingsPage],
  exports: [SettingsPage],
})
export class AppSettingsModule {
  constructor() {
    console.debug('[settings] Creating module');
  }
}
