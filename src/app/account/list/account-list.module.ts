import {NgModule} from '@angular/core';
import {AccountListComponent} from './account-list.component';
import {NgxJdenticonModule} from 'ngx-jdenticon';
import {AppSharedModule} from "@app/shared/shared.module";

@NgModule({
  imports: [
    AppSharedModule,
    NgxJdenticonModule
  ],
  declarations: [AccountListComponent],
  exports: [AccountListComponent],
})
export class AccountListModule {}
