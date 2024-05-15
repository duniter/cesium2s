import { Event, EventRecord } from '@polkadot/types/interfaces/system/types';
import { ISubmittableResult } from '@polkadot/types/types/extrinsic';
import { AddressOrPair, SubmittableExtrinsic } from '@polkadot/api-base/types/submittable';
import type { ApiTypes } from '@polkadot/api-base/types/base';
import { DispatchError } from '@polkadot/types/interfaces/system';
import { ApiPromise } from '@polkadot/api';

export class ExtrinsicError extends Error {
  private readonly failedEvent: Event;
  readonly code: string;

  constructor(api: ApiPromise, events?: EventRecord[] | Event, message?: string) {
    super();
    this.failedEvent = Array.isArray(events) ? ExtrinsicUtils.getFailedEvent(events as EventRecord[]) : (events as Event);

    if (this.failedEvent) {
      const error = this.failedEvent?.data?.[0] as DispatchError;
      if (error.isModule) {
        // for module errors, we have the section indexed, lookup
        const decoded = api.registry.findMetaError(error.asModule);
        const { docs, section, method } = decoded;
        this.message = docs.join(' ');
        this.code = `${section}.${method}`;
      } else {
        // Other, CannotLookup, BadOrigin, no extra info
        console.log(error.toString());
        this.code = 'system.ExtrinsicFailed';
        this.message = message || 'ERROR.UNKNOWN_ERROR';
      }
    }
  }
}

export abstract class ExtrinsicUtils {
  static getFailedEvent(records: EventRecord[]): Event {
    return records?.map((record) => record.event).find(ExtrinsicUtils.isExtrinsicFailedEvent);
  }
  static isExtrinsicFailedEvent(event: Event) {
    return event?.section === 'system' && event.method === 'ExtrinsicFailed';
  }

  static submit<T extends ApiTypes, R extends ISubmittableResult>(extrinsic: SubmittableExtrinsic<T, R>, issuerPair: AddressOrPair): Promise<R> {
    return new Promise<R>((resolve, reject) =>
      extrinsic.signAndSend(issuerPair, (result: R) => {
        if (result.status?.isInBlock) {
          const failedEvent = this.getFailedEvent(result.events);
          if (!failedEvent) {
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
