import { Event, EventRecord } from '@polkadot/types/interfaces/system/types';
import { ISubmittableResult } from '@polkadot/types/types/extrinsic';
import { SubmittableExtrinsic } from '@polkadot/api-base/types/submittable';
import type { ApiTypes } from '@polkadot/api-base/types/base';

export class ExtrinsicError extends Error {
  readonly failedEvent: Event;

  constructor(message?: string, events?: EventRecord[] | Event) {
    super(message);
    this.failedEvent = Array.isArray(events) ? ExtrinsicUtils.getFailedEvent(events as EventRecord[]) : (events as Event);
  }
}

export abstract class ExtrinsicUtils {
  static getFailedEvent(records: EventRecord[]): Event {
    return records?.map((record) => record.event).find(ExtrinsicUtils.isExtrinsicFailedEvent);
  }
  static isExtrinsicFailedEvent(event: Event) {
    return event?.section === 'system' && event.method === 'ExtrinsicFailed';
  }

  static submit<T extends ApiTypes, R extends ISubmittableResult>(extrinsic: SubmittableExtrinsic<T, R>, issuerPair): Promise<R> {
    return new Promise<R>((resolve, reject) =>
      extrinsic.signAndSend(issuerPair, (result: R) => {
        if (result.status?.isInBlock) {
          const failedEvent = this.getFailedEvent(result.events);
          if (!failedEvent || !reject) {
            resolve(result);
          } else {
            reject(failedEvent);
          }
        }
      })
    );
  }

  static createIsInBlockCallback(
    resolve: (result: ISubmittableResult) => void,
    reject?: (event: Event) => void
  ): (result: ISubmittableResult) => void {
    return (result: ISubmittableResult) => {
      if (result.status.isInBlock) {
        const failedEvent = this.getFailedEvent(result.events);
        if (!failedEvent || !reject) {
          resolve(result);
        } else {
          reject(failedEvent);
        }
      }
    };
  }
}
