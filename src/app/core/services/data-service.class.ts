import { Observable, Subscription } from "rxjs-compat";
import { Apollo } from "apollo-angular";
import { ApolloQueryResult, ApolloError, FetchPolicy } from "apollo-client";
import { R } from "apollo-angular/types";
import { ErrorCodes, ServiceError, ServerErrorCodes } from "./errors";
import { map } from "rxjs/operators";

import { environment } from '../../../environments/environment';
import {MatAutocompleteSearchFilter, MatAutocompleteSearchService} from "../../shared/material/material.autocomplete";
export declare interface DataService<T, F extends MatAutocompleteSearchFilter> extends MatAutocompleteSearchService<T, F>{

  search(
    offset: number,
    size: number,
    sortBy?: string,
    sortDirection?: string,
    filter?: F,
    options?: any
  ): Observable<T[]>;

}


export class BaseDataService {

  protected _debug = false;
  protected _lastVariables: any = {
    loadAll: undefined
  };

  constructor(
    protected apollo: Apollo
  ) {

  }

  protected query<T, V = R>(opts: {
    query: any,
    variables: V,
    error?: ServiceError,
    fetchPolicy?: FetchPolicy
  }): Promise<T> {
    //this.apollo.getClient().cache.reset();
    return new Promise<T>((resolve, reject) => {
      const subscription: Subscription = this.apollo.query<ApolloQueryResult<T>, V>({
        query: opts.query,
        variables: opts.variables,
        fetchPolicy: opts.fetchPolicy || (environment.apolloFetchPolicy as FetchPolicy) || undefined
      })
        .catch(error => this.onApolloError<T>(error))
        .subscribe(({ data, errors }) => {
          subscription.unsubscribe();

          if (errors) {
            if (errors[0].message == "ERROR.UNKNOWN_NETWORK_ERROR") {
              reject({
                code: ErrorCodes.UNKNOWN_NETWORK_ERROR,
                message: "ERROR.UNKNOWN_NETWORK_ERROR"
              });
              return;
            }
            console.error("[data-service] " + errors[0].message);
            reject(opts.error ? opts.error : errors[0].message);
            return;
          }
          resolve(data as T);
        });
    });
  }

  protected watchQuery<T, V = R>(opts: {
    query: any,
    variables: V,
    error?: ServiceError,
    fetchPolicy?: FetchPolicy
  }): Observable<T> {
    //this.apollo.getClient().cache.reset();
    return this.apollo.watchQuery<T, V>({
      query: opts.query,
      variables: opts.variables,
      fetchPolicy: opts.fetchPolicy || (environment.apolloFetchPolicy as FetchPolicy) || undefined,
      notifyOnNetworkStatusChange: true
    })
      .valueChanges
      .catch(error => this.onApolloError<T>(error))
      .pipe(
        map(({ data, errors }) => {
          if (errors) {
            var error = errors[0];
            if (error.message === "ERROR.UNKNOWN_NETWORK_ERROR") {
              throw {
                code: ErrorCodes.UNKNOWN_NETWORK_ERROR,
                message: "ERROR.UNKNOWN_NETWORK_ERROR"
              };
            }
            console.error("[data-service] " + errors[0].message);
            throw opts.error ? opts.error : errors[0].message;
          }
          return data;
        })
      );
  }

  protected mutate<T, V = R>(opts: {
    mutation: any,
    variables: V,
    error?: ServiceError
  }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const subscription = this.apollo.mutate<ApolloQueryResult<T>, V>({
        mutation: opts.mutation,
        variables: opts.variables
      })
        .catch(this.onApolloError)
        .subscribe(({ data, errors }) => {
          if (errors) {
            if (errors[0].message == "ERROR.UNKNOWN_NETWORK_ERROR") {
              reject(errors[0]);
            }
            else if (errors[0].message.indexOf('"{code:"') !== -1) {
              const error = JSON.parse(errors[0].message);
              console.error("[data-service] " + error.message || error);
              if (error && error.code == ServerErrorCodes.BAD_UPDATE_DATE) {
                reject({ code: ServerErrorCodes.BAD_UPDATE_DATE, message: "ERROR.BAD_UPDATE_DATE" });
              }
              else if (error && error.code == ServerErrorCodes.DATA_LOCKED) {
                reject({ code: ServerErrorCodes.DATA_LOCKED, message: "ERROR.DATA_LOCKED" });
              }
              else {
                reject(error.message ? error.message : (opts.error ? opts.error : errors[0].message));
              }
            }
            else {
              console.error("[data-service] " + errors[0].message);
              reject(opts.error ? opts.error : errors[0].message);
            }
          }
          else {
            resolve(data as T);
          }
          subscription.unsubscribe();
        });
    });
  }

  protected subscribe<T, V = R>(opts: {
    query: any,
    variables: V,
    error?: ServiceError
  }): Observable<T> {

    const res = this.apollo.subscribe({
      query: opts.query,
      variables: opts.variables
    })
      .catch(error => this.onApolloError<T>(error))
      .pipe(
        map(({ data, errors }) => {
          if (errors) {
            var error = errors[0];
            if (error.message === "ERROR.UNKNOWN_NETWORK_ERROR") {
              throw {
                code: ErrorCodes.UNKNOWN_NETWORK_ERROR,
                message: "ERROR.UNKNOWN_NETWORK_ERROR"
              };
            }
            console.error("[data-service] " + errors[0].message);
            throw opts.error ? opts.error : errors[0].message;
          }
          return data;
        })
      );

    return res;
  }

  protected addToQueryCache<V = R>(opts: {
    query: any,
    variables: V
  }, propertyName: string, newValue: any) {
    const values = this.apollo.getClient().readQuery(opts);

    if (values && values[propertyName]) {
      values[propertyName].push(newValue);

      this.apollo.getClient().writeQuery({
        query: opts.query,
        variables: opts.variables,
        data: values
      });
    } else {
      if (this._debug) console.debug("[data-service] Unable to add entity to cache. Please check query has been cached, and {" + propertyName + "} exists in the result:", opts.query);
    }
  }

  protected addManyToQueryCache<V = R>(opts: {
    query: any,
    variables: V
  }, propertyName: string, newValues: any[]) {

    if (!newValues || !newValues.length) return; // nothing to process

    const values = this.apollo.getClient().readQuery(opts);

    if (values && values[propertyName]) {
      // Keep only not existing values
      newValues = newValues.filter(nv => !values[propertyName].find(v => nv['id'] === v['id'] && nv['entityName'] === v['entityName']));

      if (!newValues.length) return; // No new value

      // Update the cache
      values[propertyName] = values[propertyName].concat(newValues);
      this.apollo.getClient().writeQuery({
        query: opts.query,
        variables: opts.variables,
        data: values
      });
    }

    else {
      if (this._debug) console.debug("[data-service] Unable to add entities to cache. Please check query has been cached, and {" + propertyName + "} exists in the result:", opts.query);
    }
  }

  protected removeToQueryCacheById<V = R>(opts: {
    query: any,
    variables: V
  }, propertyName: string, idToRemove: number) {

    const values = this.apollo.getClient().readQuery(opts);

    if (values && values[propertyName]) {

      values[propertyName] = (values[propertyName] || []).filter(item => item['id'] !== idToRemove);
      this.apollo.getClient().writeQuery({
        query: opts.query,
        variables: opts.variables,
        data: values
      });
    }
    else {
      console.warn("[data-service] Unable to remove id from cache. Please check {" + propertyName + "} exists in the result:", opts.query);
    }
  }

  protected removeToQueryCacheByIds<V = R>(opts: {
    query: any,
    variables: V
  }, propertyName: string, idsToRemove: number[]) {

    const values = this.apollo.getClient().readQuery(opts);

    if (values && values[propertyName]) {

      values[propertyName] = (values[propertyName] || []).reduce((result: any[], item: any) => {
        return idsToRemove.indexOf(item['id']) === -1 ? result.concat(item) : result;
      }, []);
      this.apollo.getClient().writeQuery({
        query: opts.query,
        variables: opts.variables,
        data: values
      });
    }
    else {
      console.warn("[data-service] Unable to remove ids from cache. Please check {" + propertyName + "} exists in the result:", opts.query);
    }
  }

  private onApolloError<T>(err: any): Observable<ApolloQueryResult<T>> {
    let result: ApolloQueryResult<T>;
    if (err && err.networkError) {
      console.error("[network] " + err.networkError.message);
      err.message = "ERROR.UNKNOWN_NETWORK_ERROR";
      result = {
        data: null,
        errors: [err],
        loading: false,
        networkStatus: err.networkStatus,
        stale: err.stale
      };
    }
    else {
      if (err instanceof ApolloError) {
        result = {
          data: null,
          errors: err.graphQLErrors,
          loading: false,
          networkStatus: null,
          stale: null
        };
      }
    }
    return Observable.of(result);
  }

}