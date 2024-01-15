import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BlockPage } from '@app/block/block.page';
import { AppSharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [AppSharedModule, TranslateModule.forChild()],
  declarations: [BlockPage],
  exports: [TranslateModule, BlockPage],
})
export class AppBlockModule {}
