import {Observable} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {isNotNil} from './functions';


export function filterNotNil<T = any>(obs: Observable<T>): Observable<T> {
  return obs.pipe(filter(isNotNil));
}
export function firstNotNil<T = any>(obs: Observable<T>): Observable<T> {
  return obs.pipe(first(isNotNil));
}
export function filterTrue(obs: Observable<boolean>): Observable<boolean> {
  return obs.pipe(filter((v) => v === true));
}
export function filterFalse(obs: Observable<boolean>): Observable<boolean> {
  return obs.pipe(filter((v) => v === false));
}
export function firstTruePromise(obs: Observable<boolean>): Promise<boolean> {
  return obs.pipe(first((v) => v === true)).toPromise();
}
export function firstFalsePromise(obs: Observable<boolean>): Promise<boolean> {
  return obs.pipe(first((v) => v === false)).toPromise();
}
export function firstNotNilPromise<T = any>(obs: Observable<T>): Promise<T> {
  return firstNotNil(obs).toPromise();
}
export function chainPromises<T = any>(defers: (() => Promise<any>)[]): Promise<T[]> {
  return (defers || []).reduce((previous: Promise<any> | null, defer) => {
    // First job
    if (!previous) {
      return defer()
        // Init the final result array, with the first result
        .then(jobRes => [jobRes]);
    }
    // Other jobs
    return previous
      .then((finalResult) => defer()
        // Add job result to final result array
        .then(jobRes => finalResult.concat(jobRes)));
  }, null);
}
