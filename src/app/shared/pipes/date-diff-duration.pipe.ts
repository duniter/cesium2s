import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { DateUtils, fromDateISOString } from '@app/shared/dates';

@Pipe({
  name: 'dateDiffDuration',
})
export class DateDiffDurationPipe implements PipeTransform {
  protected dayUnit = this.translate.instant('COMMON.DAYS');

  constructor(private translate: TranslateService) {}

  transform(value: { startValue: string | Moment; endValue: string | Moment }): string | Promise<string> {
    if (!value.startValue || !value.endValue) return '';

    const startDate = fromDateISOString(value.startValue);
    const endDate = fromDateISOString(value.endValue);

    const duration = DateUtils.moment.duration(endDate.diff(startDate));
    if (duration.asMinutes() < 0) return '';

    const timeDuration = DateUtils.moment(0).hour(duration.hours()).minute(duration.minutes());

    const days = Math.floor(duration.asDays());
    return (days > 0 ? days.toString() + (this.dayUnit + ' ') : '') + timeDuration.format('HH:mm');
  }
}
