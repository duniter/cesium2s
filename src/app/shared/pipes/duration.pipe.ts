import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { toDuration } from '../dates';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  protected dayUnit = this.translate.instant('COMMON.DAYS');

  constructor(private translate: TranslateService) {}

  transform(value: number, args?: moment.unitOfTime.DurationConstructor | { unit: moment.unitOfTime.DurationConstructor }): string {
    if (!value) return '';
    const unit: moment.unitOfTime.DurationConstructor = (typeof args === 'object' ? args.unit : args) || 'hours';

    // try with moment
    const duration = toDuration(value, unit);

    return duration.humanize();
  }
}
