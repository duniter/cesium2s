import { ModuleWithProviders, NgModule } from '@angular/core';

import { TransferPage } from './transfer.page';
import { AppSharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TransferController } from '@app/transfer/transfer.controller';
import { APP_TRANSFER_CONTROLLER } from '@app/transfer/transfer.model';
import { ScanComponent } from '@app/scan/scan.component';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild(), ScanComponent],
  declarations: [TransferPage],
})
export class AppTransferModule {
  static forRoot(): ModuleWithProviders<AppTransferModule> {
    console.debug('[transfer] Creating module (root)');
    return {
      ngModule: AppTransferModule,
      providers: [TransferController, { provide: APP_TRANSFER_CONTROLLER, useExisting: TransferController }],
    };
  }
}
