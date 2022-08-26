import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';
import {DateFormatPipe} from './date-format.pipe';
import {DateDiffDurationPipe} from './date-diff-duration.pipe';
import {DateFromNowPipe} from './date-from-now.pipe';
import {NumberFormatPipe} from './number-format.pipe';
import {HighlightPipe} from './highlight.pipe';
import {FileSizePipe} from './file-size.pipe';
import {DurationPipe} from './duration.pipe';
import {EvenPipe, MathAbsPipe, OddPipe} from './math.pipes';
import {
  ArrayFilterPipe,
  ArrayFirstPipe,
  ArrayIncludesPipe,
  ArrayLengthPipe,
  ArrayPluckPipe,
  EmptyArrayPipe,
  NotEmptyArrayPipe
} from './arrays.pipe';
import {MapGetPipe, MapKeysPipe, MapValuesPipe} from './maps.pipe';
import {
  AbbreviatePipe,
  IsNilOrBlankPipe,
  IsNotNilOrBlankPipe,
  StrIncludesPipe,
  StrLengthPipe,
  ToStringPipe,
  TranslatablePipe
} from './string.pipes';
import {NgInitDirective} from './ng-init.pipe';
import {FormGetArrayPipe, FormGetControlPipe, FormGetGroupPipe, FormGetPipe, FormGetValuePipe} from './form.pipes';
import {PropertyGetPipe} from './property.pipes';
import {AmountFormatPipe} from "@app/shared/pipes/amount.pipe";
import {AddressFormatPipe} from "@app/shared/pipes/address.pipes";
import {AccountBalancePipe, AccountNamePipe} from "@app/shared/pipes/account.pipes";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [
    PropertyGetPipe,
    DateFormatPipe,
    DateDiffDurationPipe,
    DurationPipe,
    DateFromNowPipe,
    HighlightPipe,
    NumberFormatPipe,
    FileSizePipe,
    MathAbsPipe,
    OddPipe,
    EvenPipe,
    NotEmptyArrayPipe,
    EmptyArrayPipe,
    ArrayLengthPipe,
    ArrayFirstPipe,
    ArrayPluckPipe,
    ArrayIncludesPipe,
    ArrayFilterPipe,
    MapGetPipe,
    MapKeysPipe,
    MapValuesPipe,
    IsNilOrBlankPipe,
    IsNotNilOrBlankPipe,
    ToStringPipe,
    StrLengthPipe,
    StrIncludesPipe,
    TranslatablePipe,
    NgInitDirective,
    FormGetPipe,
    FormGetControlPipe,
    FormGetArrayPipe,
    FormGetGroupPipe,
    FormGetValuePipe,
    // Currency pipes
    AmountFormatPipe,
    AddressFormatPipe,
    AbbreviatePipe,
    // Account pipes
    AccountBalancePipe,
    AccountNamePipe
  ],
  exports: [
    PropertyGetPipe,
    DateFormatPipe,
    DateFromNowPipe,
    DateDiffDurationPipe,
    DurationPipe,
    HighlightPipe,
    NumberFormatPipe,
    FileSizePipe,
    MathAbsPipe,
    OddPipe,
    EvenPipe,
    NotEmptyArrayPipe,
    EmptyArrayPipe,
    ArrayLengthPipe,
    ArrayFirstPipe,
    ArrayPluckPipe,
    MapGetPipe,
    MapKeysPipe,
    MapValuesPipe,
    IsNilOrBlankPipe,
    IsNotNilOrBlankPipe,
    ToStringPipe,
    StrLengthPipe,
    StrIncludesPipe,
    ArrayIncludesPipe,
    ArrayFilterPipe,
    TranslatablePipe,
    NgInitDirective,
    FormGetPipe,
    FormGetControlPipe,
    FormGetArrayPipe,
    FormGetGroupPipe,
    FormGetValuePipe,
    // Currency pipes
    AmountFormatPipe,
    AddressFormatPipe,
    AbbreviatePipe,
    // Account pipes
    AccountBalancePipe,
    AccountNamePipe
  ]
})
export class SharedPipesModule {

}
