import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { isMoment, Moment } from 'moment';
import { fromDateISOString } from '@app/shared/dates';

@Pipe({
  name: 'dateFromNow',
})
@Injectable({ providedIn: 'root' })
export class DateFromNowPipe implements PipeTransform {
  constructor() {}

  transform(value: string | Moment, withoutSuffix: boolean): string {
    const date: Moment = isMoment(value) ? (value as Moment) : fromDateISOString(value);
    return date ? date.fromNow(withoutSuffix) : '';
  }
}
