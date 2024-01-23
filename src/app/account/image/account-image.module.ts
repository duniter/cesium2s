import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { AccountImageComponent } from '@app/account/image/account-image.component';
import { NgxJdenticonModule } from 'ngx-jdenticon';

@NgModule({
  imports: [AppSharedModule, NgxJdenticonModule],
  declarations: [AccountImageComponent],
  exports: [AccountImageComponent],
})
export class AccountImageModule {}
