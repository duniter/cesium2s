import {Pipe, Injectable, PipeTransform} from '@angular/core';
import {Moment} from "moment/moment";
import {DateAdapter} from "@angular/material";
import {DATE_ISO_PATTERN} from '../constants';
import {TranslateService} from "@ngx-translate/core";

let moment = require('moment');

@Pipe({
  name: 'dateDiffDuration'
})
@Injectable()
export class DateDiffDurationPipe implements PipeTransform {

  private dayUnit: string;

  constructor(
    private dateAdapter: DateAdapter<Moment>,
    private translate: TranslateService) {
    translate.get('COMMON.DAY_UNIT').subscribe(value => this.dayUnit = value)

  }

  transform(value: { startValue: string | Moment; endValue: string | Moment }, args?: any): string | Promise<string> {
    if (!value.startValue || !value.endValue) return '';

    const startDate = this.dateAdapter.parse(value.startValue, DATE_ISO_PATTERN);
    const endDate = this.dateAdapter.parse(value.endValue, DATE_ISO_PATTERN);
    const duration = moment.duration(endDate.diff(startDate));
    if (duration.asMinutes() < 0) return '';

    const timeDuration = moment(0)
      .hour(duration.hours())
      .minute(duration.minutes());

    let days = Math.floor(duration.asDays());
    const result = (days > 0 ? days.toString() + (this.dayUnit + ' ') : '') + timeDuration.format('HH:mm');
    return result;
  }
}
