import { Pipe, PipeTransform } from '@angular/core';
import { IndexerService } from '@app/network/indexer.service';
import { isNil } from '@app/shared/functions';
import { SettingsService } from '@app/settings/settings.service';

@Pipe({
  name: 'blockNumber',
})
export class BlockNumberPipe implements PipeTransform {
  constructor(
    private indexer: IndexerService,
    private settings: SettingsService
  ) {}

  transform(blockNumber: number, opts?: { allowSuffix: boolean } & Intl.NumberFormatOptions): string {
    if (isNil(blockNumber)) return null;

    // Convert V1 block number (cf CRR https://pad.p2p.legal/Visio_2024-04-29)
    if (blockNumber < 0 && this.indexer.minBlockHeight) {
      blockNumber = -1 * this.indexer.minBlockHeight + blockNumber;
      if (opts?.allowSuffix !== false) {
        return `${blockNumber.toLocaleString(this.settings.locale, { ...this.settings.numberFormatOptions, ...opts })} (v1)`;
      }
    }

    return blockNumber.toLocaleString(this.settings.locale, { ...this.settings.numberFormatOptions, ...opts });
  }
}
