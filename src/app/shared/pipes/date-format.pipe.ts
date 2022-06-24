import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {isMoment, Moment} from 'moment';
import {DATE_ISO_PATTERN, fromDateISOString} from '../dates';
import {TranslateService} from '@ngx-translate/core';
import * as momentImported from 'moment';

const moment = momentImported;

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  private readonly dateShortPattern: string;
  private readonly dateTimePattern: string;

  constructor(
      private translate: TranslateService
    ) {
    const translations = translate.instant(['COMMON.DATE_PATTERN', 'COMMON.DATE_SHORT_PATTERN']);
    this.dateTimePattern = translations['COMMON.DATE_PATTERN'];
    this.dateShortPattern = translations['COMMON.DATE_SHORT_PATTERN'];
  }

  transform(value: string | Moment | Date, opts?: { pattern?: string; short?: boolean } ): string {
    if (!value) return '';
    const pattern = opts?.pattern || (opts?.short ? this.dateShortPattern : this.dateTimePattern);
    const date: Moment = isMoment(value) ? value : fromDateISOString(value);
    return date?.format(pattern) || '';
  }
}
