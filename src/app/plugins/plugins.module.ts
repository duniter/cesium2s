import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {EsModule} from "./es/es.module";


@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        EsModule
    ],
    exports: [
        EsModule
    ]
})
export class PluginsModule {

}
