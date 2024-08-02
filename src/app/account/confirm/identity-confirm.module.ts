import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IdentityConfirmForm } from '@app/account/confirm/identity-confirm.form';
import { IdentityConfirmModal } from '@app/account/confirm/identity-confirm.modal';
import { AppSharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [AppSharedModule],
  declarations: [IdentityConfirmForm, IdentityConfirmModal],
  exports: [AppSharedModule, IdentityConfirmForm, IdentityConfirmModal, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppIdentityConfirmModule {}
