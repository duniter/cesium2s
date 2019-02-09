import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { WotService } from './services/wot.service';
import { WotValidatorService } from './services/wot.validator';
import { WotSearchPage } from './pages/search';


export {
    WotService, WotValidatorService, WotSearchPage
}

@NgModule({
    imports: [
        CommonModule,
        CoreModule
    ],
    declarations: [
        WotSearchPage
    ],
    exports: [
        WotSearchPage
    ],
    entryComponents: [
    ],
    providers: [
        WotService,
        WotValidatorService
    ]
})
export class WotModule {
}
