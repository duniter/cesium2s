import { firstValueFrom, map, merge, Observable, switchMap, takeUntil, timer } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { isNotNil } from './functions';
import { Predicate } from '@angular/core';

export function filterNotNil<T>(obs: Observable<T>): Observable<T> {
  return obs.pipe(filter(isNotNil));
}
export function firstNotNil<T>(obs: Observable<T>): Observable<T> {
  return obs.pipe(first(isNotNil));
}
export function filterTrue(obs: Observable<boolean>): Observable<boolean> {
  return obs.pipe(filter((v) => v === true));
}
export function filterFalse(obs: Observable<boolean>): Observable<boolean> {
  return obs.pipe(filter((v) => v === false));
}
export function firstTruePromise(obs: Observable<boolean>): Promise<boolean> {
  return firstValueFrom(obs.pipe(filter((v) => v === true)));
}
export function firstFalsePromise(obs: Observable<boolean>): Promise<boolean> {
  return firstValueFrom(obs.pipe(filter((v) => v === false)));
}
export function firstNotNilPromise<T>(obs: Observable<T>): Promise<T> {
  return firstValueFrom(obs.pipe(filter(isNotNil)));
}
export function chainPromises<T>(defers: (() => Promise<T>)[]): Promise<T[]> {
  return (defers || []).reduce((previous: Promise<any> | null, defer) => {
    // First job
    if (!previous) {
      return (
        defer()
          // Init the final result array, with the first result
          .then((jobRes) => [jobRes])
      );
    }
    // Other jobs
    return previous.then((finalResult) =>
      defer()
        // Add job result to final result array
        .then((jobRes) => finalResult.concat(jobRes))
    );
  }, null);
}

export function firstTrue(obs: Observable<boolean>): Observable<void> {
  return obs.pipe(
    first((v) => v === true),
    map(() => {}) // Convert to void
  );
}

export declare interface WaitForOptions {
  dueTime?: number;
  checkPeriod?: number;
  timeout?: number;
}

/**
 * Wait form a predicate return true. This need to implement AppFormUtils.waitWhilePending(), AppFormUtils.waitIdle()
 * @param predicate
 * @param opts
 */
export async function waitFor(predicate: Predicate<void>, opts?: WaitForOptions): Promise<void> {
  if (predicate()) return Promise.resolve();

  const period = (opts && opts.checkPeriod) || 300;
  const dueTime = (opts && opts.dueTime) || period;
  // eslint-disable-next-line @rx-angular/no-zone-critical-rxjs-creation-apis
  let wait$: Observable<boolean> = timer(dueTime, period).pipe(
    // For DEBUG :
    //tap(() => console.debug("Waiting form idle...", form)),
    filter(() => predicate()),
    map(() => true)
  );

  // Add timeout
  if (opts && opts.timeout) {
    // eslint-disable-next-line @rx-angular/no-zone-critical-rxjs-creation-apis
    const $timeout = timer(opts.timeout);
    wait$ = merge(
      wait$.pipe(takeUntil($timeout)),
      $timeout.pipe(
        map(() => {
          throw new Error(`Timeout waitIdle() - after ${opts.timeout}ms`);
        })
      )
    );
  }

  await firstNotNilPromise(wait$);
}

export async function waitForTrue(observable: Observable<boolean>, opts?: WaitForOptions): Promise<void> {
  const firstTrueObservable = firstTrue(observable);

  // Timeout (+ dueTime)
  if (opts && opts.timeout > 0) {
    // eslint-disable-next-line @rx-angular/no-zone-critical-rxjs-creation-apis
    const $timeout = timer(opts.timeout);
    return firstValueFrom(
      merge(
        // eslint-disable-next-line @rx-angular/no-zone-critical-rxjs-creation-apis
        timer(opts.dueTime || 0).pipe(
          switchMap(() => firstTrueObservable),
          takeUntil($timeout)
        ),
        $timeout.pipe(
          map(() => {
            throw new Error(`Timeout ready() - after ${opts.timeout}ms`);
          })
        )
      )
    );
  }
  // dueTime (without timeout)
  if (opts && opts.dueTime > 0) {
    // eslint-disable-next-line @rx-angular/no-zone-critical-rxjs-creation-apis
    return firstValueFrom(timer(opts.dueTime).pipe(switchMap(() => firstTrueObservable)));
  }
  return firstValueFrom(firstTrueObservable);
}
