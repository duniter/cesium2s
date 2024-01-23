import { NgModule } from '@angular/core';

import { HomePage } from './home.page';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HomePageRoutingModule } from '@app/home/home-routing.module';
import { AppAuthModule } from '@app/account/auth/auth.module';
import { AppRegisterModule } from '@app/account/register/register.module';
import { AppTransferModule } from '@app/transfer/send/transfer.module';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild(), HomePageRoutingModule, AppAuthModule, AppRegisterModule, AppTransferModule],
  declarations: [HomePage],
})
export class HomeModule {}
