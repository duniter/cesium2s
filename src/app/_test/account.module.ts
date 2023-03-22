import {NgModule} from '@angular/core';
import {AccountListComponent} from './account-list.component';
import {AccountDetailModal} from './account-detail.modal';
import {NgxJdenticonModule} from 'ngx-jdenticon';
import {AccountRoutingModule} from "@app/_test/account-routing.module";
import {AppSharedModule} from "@app/shared/shared.module";

@NgModule({
  imports: [
    AppSharedModule,
    NgxJdenticonModule,
    AccountRoutingModule
  ],
  declarations: [AccountListComponent, AccountDetailModal],
  exports: [AccountListComponent],
})
export class AccountModule {}
