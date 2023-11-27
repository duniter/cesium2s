import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from "@app/home/home.page";
import {PlaygroundPage} from "@app/playground/playground.page";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlaygroundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaygroundPageRoutingModule {}
