import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from '@app/settings/settings.page';
import { AppSettingsModule } from '@app/settings/settings.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
];

@NgModule({
  imports: [AppSettingsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutingModule {}
