import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { DateUtils } from '@app/shared/dates';
import { NetworkService } from '@app/network/network.service';

@Pipe({
  name: 'blockTime',
})
export class BlockTimePipe implements PipeTransform {
  constructor(private networkService: NetworkService) {}

  transform(blockNumber: number): Moment {
    if (!blockNumber) return null;

    const blockDate = (this.networkService.currency.startTime as Moment).clone();
    const blockDuration = 6;

    const duration = DateUtils.toDuration(blockNumber * blockDuration, 'seconds');
    blockDate.add(duration);
    return blockDate;
  }
}

@Pipe({
  name: 'blocksToDuration',
})
export class BlocksToDurationPipe implements PipeTransform {
  constructor(private networkService: NetworkService) {}

  transform(blocks: number): String {
    if (!blocks) return null;
    const blockDuration = 6;

    const duration = DateUtils.toDuration(blocks * blockDuration, 'seconds');
    return duration.humanize();
  }
}
