import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";

import { AutofocusDirective } from './directives/autofocus.directive';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { LatLongFormatPipe } from './pipes/latlong-format.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { ToolbarComponent } from './toolbar/toolbar';
import { MatDateTime } from './material/material.datetime';
import { MatLatLong } from './material/material.latlong';
import { MatBooleanField } from './material/material.boolean';
import { MatAutocompleteField } from './material/material.autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        TextMaskModule,
        IonicModule,
        TranslateModule.forChild()
    ],
    declarations: [
        AutofocusDirective,
        ToolbarComponent,
        DateFormatPipe,
        LatLongFormatPipe,
        HighlightPipe,
        MatDateTime,
        MatLatLong,
        MatBooleanField,
        MatAutocompleteField
    ],
    exports: [
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        IonicModule,
        AutofocusDirective,
        ToolbarComponent,
        DateFormatPipe,
        LatLongFormatPipe,
        HighlightPipe,
        TextMaskModule,
        TranslateModule,
        MatDateTime,
        MatLatLong,
        MatBooleanField,
        MatAutocompleteField
    ],
    providers: [
        DateFormatPipe,
        LatLongFormatPipe,
        HighlightPipe
    ]
})
export class SharedModule { }
