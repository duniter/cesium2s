import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanComponent } from '@app/scan/scan.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ScanComponent,
  },
];

@NgModule({
  imports: [ScanComponent, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppScanRoutingModule {}
