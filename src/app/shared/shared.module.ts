import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPipesModule } from '@app/shared/pipes/pipes.module';
import { QrCodeModule } from 'ng-qrcode';
import { ListPopoverModule } from '@app/shared/popover/list.popover.module';
import { RxPush } from '@rx-angular/template/push';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { RxIf } from '@rx-angular/template/if';
import { MaskitoModule } from '@maskito/angular';
import { SwiperDirective } from '@app/shared/swiper/app-swiper.directive';
import { AppSkeletonListComponent } from '@app/shared/loading/skeleton.list/skeleton.list.component';
import { AppGraphQLModule } from '@app/shared/services/network/graphql/graphql.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QrCodeModule,
    MaskitoModule,

    // RxState template
    RxPush,
    RxFor,
    RxLet,
    RxIf,

    // Sub modules
    SharedPipesModule,
    ListPopoverModule,
    SwiperDirective,
    AppGraphQLModule,
    AppSkeletonListComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    QrCodeModule,
    MaskitoModule,

    // RxState template
    RxPush,
    RxFor,
    RxLet,
    RxIf,

    // Sub modules
    SharedPipesModule,
    ListPopoverModule,
    SwiperDirective,
    AppGraphQLModule,
    AppSkeletonListComponent,
  ],
})
export class AppSharedModule {}
