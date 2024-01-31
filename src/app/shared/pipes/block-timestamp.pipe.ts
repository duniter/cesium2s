import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { DateUtils, fromDateISOString } from '@app/shared/dates';

@Pipe({
  name: 'blockTime',
})
export class BlockTimePipe implements PipeTransform {
  constructor() {}

  transform(blockNumber: number): Moment {
    if (!blockNumber) return null;

    // TODO: get from network service
    const blockDate = fromDateISOString('2023-11-29T21:39:00.00Z');
    const blockDuration = 6;

    const duration = DateUtils.toDuration(blockNumber * blockDuration, 'seconds');
    blockDate.add(duration);
    return blockDate;
  }
}
