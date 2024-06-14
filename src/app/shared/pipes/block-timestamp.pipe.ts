import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { DateUtils } from '@app/shared/dates';
import { NetworkService } from '@app/network/network.service';
import { isNil } from '@app/shared/functions';
import { IndexerService } from '@app/network/indexer.service';

@Pipe({
  name: 'blockTime',
})
export class BlockTimePipe implements PipeTransform {
  constructor(
    private networkService: NetworkService,
    private indexer: IndexerService
  ) {}

  transform(blockNumber: number): Moment {
    if (isNil(blockNumber)) return null;

    const startTime = DateUtils.fromDateISOString(this.networkService.currency.startTime);

    // block V1
    if (blockNumber < 0 && this.indexer.minBlockHeight) {
      // FIXME BLA: find a better way to get V1 block time
      /*blockNumber = -1 * this.indexer.minBlockHeight + blockNumber;
      const blockDuration = 5;

      const duration = DateUtils.toDuration(blockNumber * blockDuration, 'minute');
      return startTime.clone().subtract(duration);*/

      return null;
    } else {
      // TODO: get from network service
      const blockDuration = 6;
      const duration = DateUtils.toDuration(blockNumber * blockDuration, 'seconds');
      return startTime.clone().add(duration);
    }
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
