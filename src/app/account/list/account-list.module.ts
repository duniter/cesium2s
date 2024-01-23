import { NgModule } from '@angular/core';
import { AccountListComponent } from './account-list.component';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RxFor } from '@rx-angular/template/for';
import { AccountImageModule } from '@app/account/image/account-image.module';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild(), RxFor, AccountImageModule],
  declarations: [AccountListComponent],
  exports: [AccountListComponent, TranslateModule],
})
export class AccountListModule {}
