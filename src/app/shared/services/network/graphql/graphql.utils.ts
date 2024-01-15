import { ApolloClient, ApolloLink, NextLink, Operation } from '@apollo/client/core';
import { EventEmitter } from '@angular/core';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { getMainDefinition } from '@apollo/client/utilities';
import { PersistentStorage } from 'apollo3-cache-persist';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../../storage/storage.service';

declare let window: any;
const _global = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
export const NativeWebSocket = _global.WebSocket || _global.MozWebSocket;

export interface EmptyObject {
  [key: string]: any;
}

/**
 * AppWebSocket class.
 * With a hack on default Websocket, to avoid the use of protocol
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppWebSocket = function (url: string, protocols?: string | string[]) {
  return new NativeWebSocket(url /*no protocols*/);
} as typeof NativeWebSocket;
AppWebSocket.CLOSED = NativeWebSocket.CLOSED;
AppWebSocket.CLOSING = NativeWebSocket.CLOSING;
AppWebSocket.CONNECTING = NativeWebSocket.CONNECTING;
AppWebSocket.OPEN = NativeWebSocket.OPEN;

export function isMutationOperation(operation: Operation) {
  const def = getMainDefinition(operation.query);
  return def.kind === 'OperationDefinition' && def.operation === 'mutation';
}

export function isSubscriptionOperation(operation: Operation) {
  const def = getMainDefinition(operation.query);
  return def.kind === 'OperationDefinition' && def.operation === 'subscription';
}

export interface TrackedQuery {
  id: string;
  name: string;
  queryJSON: string;
  variablesJSON: string;
  contextJSON: string;
}

export const TRACKED_QUERIES_STORAGE_KEY = 'apollo-tracker-persist';

export default class TrackerLink extends ApolloLink {
  private trackedQueriesUpdated = new EventEmitter();
  private trackedQueriesById: { [id: string]: TrackedQuery } = {};
  private enableSubject = new BehaviorSubject<boolean>(false);
  private readonly subscription = new Subscription();
  private readonly debug: boolean;

  constructor(opts: { debounce?: number; storage: PersistentStorage<string>; debug?: boolean }) {
    super();
    this.debug = opts.debug || false;

    // Save pending and tracked queries in storage
    this.subscription.add(
      this.trackedQueriesUpdated
        .pipe(
          debounceTime(opts.debounce || 1000),
          switchMap(() => this.enableSubject),
          // Continue if offline
          filter((enable) => enable && !!opts.storage)
        )
        .subscribe(() => {
          const trackedQueries = Object.getOwnPropertyNames(this.trackedQueriesById)
            .map((key) => this.trackedQueriesById[key])
            .filter((value) => value !== undefined);
          if (this.debug) console.debug('[apollo-tracker-link] Saving tracked queries to storage', trackedQueries);
          return opts.storage.setItem(TRACKED_QUERIES_STORAGE_KEY, JSON.stringify(trackedQueries));
        })
    );
  }

  enable() {
    this.enableSubject.next(true);
  }

  disable() {
    this.enableSubject.next(false);
  }

  get enabled(): boolean {
    return this.enableSubject.value;
  }

  destroy() {
    this.subscription?.unsubscribe();
  }

  request(operation: Operation, forward: NextLink) {
    if (!this.enabled) {
      return forward(operation);
    }

    const context = operation.getContext();

    // Skip if not tracked
    if (!context || !context.tracked) return forward(operation);

    const id = context.serializationKey || uuidv4();
    if (this.debug) console.debug(`[apollo-tracker-link] Watching tracked query {${operation.operationName}#${id}}`);

    // Clean context, before calling JSON.stringify (remove unused attributes)
    const cleanContext = { ...context, ...{ optimisticResponse: null, cache: null } };

    const trackedQuery: TrackedQuery = {
      id,
      name: operation.operationName,
      queryJSON: JSON.stringify(operation.query),
      variablesJSON: JSON.stringify(operation.variables),
      contextJSON: JSON.stringify(cleanContext),
    };

    // Add to map
    this.trackedQueriesById[id] = trackedQuery;
    this.trackedQueriesUpdated.emit();

    const nextOperation = forward(operation).map((data) => {
      if (this.debug) console.debug(`[apollo-tracker-link] Query {${operation.operationName}#${id}} succeed!`, data);
      delete this.trackedQueriesById[id];
      this.trackedQueriesUpdated.emit(this.trackedQueriesById); // update

      return data;
    });

    // If offline, return the optimistic response
    if (this.enabled) {
      if (context.optimisticResponse) {
        if (this.debug)
          console.debug(`[apollo-tracker-link] Query {${operation.operationName}#${id}} has optimistic response: `, context.optimisticResponse);
      } else {
        console.warn(
          `[apollo-tracker-link] Query {${operation.operationName}#${id}} missing 'context.optimisticResponse': waiting network UP before to continue...`
        );
      }
    }

    return nextOperation;
  }
}

export async function restoreTrackedQueries(opts: { client: ApolloClient<any>; storage: PersistentStorage<any>; debug?: boolean }) {
  const list = JSON.parse(await opts.storage.getItem(TRACKED_QUERIES_STORAGE_KEY)) as TrackedQuery[];

  if (!list) return;
  if (opts.debug) console.debug('[apollo-tracker-link] Restoring tracked queries', list);

  const promises = (list || []).map((trackedQuery) => {
    const context = JSON.parse(trackedQuery.contextJSON);
    const query = JSON.parse(trackedQuery.queryJSON);
    const variables = JSON.parse(trackedQuery.variablesJSON);
    return opts.client.mutate({
      context,
      mutation: query,
      optimisticResponse: context.optimisticResponse,
      //update: updateHandlerByName[trackedQuery.name],
      variables,
    });
  });

  return Promise.all(promises);
}

export class StorageServiceWrapper implements PersistentStorage<any> {
  constructor(private storage: StorageService) {}

  getItem(key: string) {
    return this.storage.get(key);
  }
  removeItem(key: string) {
    return this.storage.remove(key);
  }
  setItem(key: string, value: any) {
    return this.storage.set(key, value);
  }
}

export interface ApolloError {
  code?: number;
  message?: string;
  networkError: any;
  graphQLErrors: any[];
  originalError: any;
  stack: any;
}
