import { Pipe, PipeTransform } from '@angular/core';
import { IndexerService } from '@app/network/indexer.service';

@Pipe({
  name: 'blockNumber',
})
export class BlockNumberPipe implements PipeTransform {
  constructor(private indexer: IndexerService) {}

  transform(blockNumber: number, suffixV1 = true): string {
    if (!blockNumber) return null;

    // Convert V1 block number (cf CRR https://pad.p2p.legal/Visio_2024-04-29)
    if (blockNumber < 0 && this.indexer.minBlockHeight) {
      blockNumber = -1 * this.indexer.minBlockHeight + blockNumber;
      if (suffixV1) {
        return `${blockNumber.toLocaleString()} (v1)`;
      }
    }

    return blockNumber.toLocaleString();
  }
}
