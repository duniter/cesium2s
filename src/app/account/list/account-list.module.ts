import { NgModule } from '@angular/core';
import { AccountListComponent } from './account-list.component';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RxFor } from '@rx-angular/template/for';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild(), NgxJdenticonModule, RxFor],
  declarations: [AccountListComponent],
  exports: [AccountListComponent, TranslateModule],
})
export class AccountListModule {}
