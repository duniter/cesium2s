import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {WotSearchFilter, WotService} from './services/wot.service';
import {WotValidatorService} from './services/wot.validator';
import {WotSearchPage,} from './pages/wot-search';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";


export {
    WotService, WotValidatorService, WotSearchPage, WotSearchFilter
};

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
