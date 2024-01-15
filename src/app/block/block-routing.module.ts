import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockPage } from '@app/block/block.page';
import { AppBlockModule } from '@app/block/block.module';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: BlockLookupPage
  // },
  {
    path: ':height',
    pathMatch: 'full',
    component: BlockPage,
  },
  {
    path: 'id/:id',
    pathMatch: 'full',
    component: BlockPage,
  },
];

@NgModule({
  imports: [AppBlockModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppBlockRoutingModule {}
