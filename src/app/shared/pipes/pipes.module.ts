import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { BlocksToDurationPipe, BlockTimePipe } from './block-timestamp.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { DateDiffDurationPipe } from './date-diff-duration.pipe';
import { DateFromNowPipe } from './date-from-now.pipe';
import { NumberFormatPipe } from './number-format.pipe';
import { HighlightPipe } from './highlight.pipe';
import { FileSizePipe } from './file-size.pipe';
import { DurationPipe } from './duration.pipe';
import { EvenPipe, MathAbsPipe, OddPipe } from './math.pipes';
import {
  ArrayFilterPipe,
  ArrayFirstPipe,
  ArrayIncludesPipe,
  ArrayJoinPipe,
  ArrayLengthPipe,
  ArrayPluckPipe,
  EmptyArrayPipe,
  NotEmptyArrayPipe,
} from './arrays.pipe';
import { MapGetPipe, MapKeysPipe, MapValuesPipe } from './maps.pipe';
import {
  AbbreviatePipe,
  IsNilOrBlankPipe,
  IsNotNilOrBlankPipe,
  StrIncludesPipe,
  StrLengthPipe,
  ToStringPipe,
  TranslatablePipe,
} from './string.pipes';
import { NgInitDirective } from './ng-init.pipe';
import { FormErrorPipe, FormGetArrayPipe, FormGetControlPipe, FormGetGroupPipe, FormGetPipe, FormGetValuePipe } from './form.pipes';
import { PropertyGetPipe } from './property.pipes';
import { AmountFormatPipe } from '@app/shared/pipes/amount.pipe';
import { AddressFormatPipe, AddressToPubkeyPipePipe } from '@app/shared/pipes/address.pipes';
import {
  AccountBalancePipe,
  AccountNamePipe,
  AccountPropertyPipe,
  IsMemberAccountPipe,
  IsUserAccountPipePipe,
} from '@app/shared/pipes/account.pipes';
import { PubkeyFormatPipe } from '@app/shared/pipes/pubkey.pipes';
import { BlockNumberPipe } from '@app/shared/pipes/block-number.pipe';

@NgModule({
  declarations: [
    PropertyGetPipe,
    BlockTimePipe,
    BlocksToDurationPipe,
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
    ArrayJoinPipe,
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
    FormErrorPipe,
    // Block
    BlockTimePipe,
    BlockNumberPipe,
    // Currency pipes
    AmountFormatPipe,
    AddressFormatPipe,
    AddressToPubkeyPipePipe,
    PubkeyFormatPipe,
    AbbreviatePipe,
    // Account pipes
    AccountPropertyPipe,
    AccountBalancePipe,
    AccountNamePipe,
    IsMemberAccountPipe,
    IsUserAccountPipePipe,
  ],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [
    PropertyGetPipe,
    BlockTimePipe,
    BlocksToDurationPipe,
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
    ArrayJoinPipe,
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
    FormErrorPipe,

    // Block
    BlockTimePipe,
    BlockNumberPipe,
    // Currency pipes
    AmountFormatPipe,
    AddressFormatPipe,
    AddressToPubkeyPipePipe,
    PubkeyFormatPipe,
    AbbreviatePipe,
    // Account pipes
    AccountPropertyPipe,
    AccountBalancePipe,
    AccountNamePipe,
    IsMemberAccountPipe,
    IsUserAccountPipePipe,
  ],
})
export class SharedPipesModule {}
