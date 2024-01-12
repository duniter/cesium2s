import { firstValueFrom, Observable, of, Subject } from 'rxjs';
import { Apollo, ExtraSubscriptionOptions, QueryRef } from 'apollo-angular';
import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  ApolloQueryResult,
  FetchPolicy,
  InMemoryCache,
  MutationUpdaterFn,
  NetworkStatus,
  OperationVariables,
  TypePolicies,
  WatchQueryFetchPolicy,
} from '@apollo/client/core';
import { ErrorCodes, ServerErrorCodes } from '../network.errors';
import { catchError, filter, first, map } from 'rxjs/operators';

import { Directive, inject, InjectionToken } from '@angular/core';

import TrackerLink, {
  ApolloError,
  AppWebSocket,
  EmptyObject,
  isMutationOperation,
  isSubscriptionOperation,
  restoreTrackedQueries,
  StorageServiceWrapper,
} from './graphql.utils';
import { RetryLink } from '@apollo/client/link/retry';
import queueLinkImported from 'apollo-link-queue';
import serializingLinkImported from 'apollo-link-serialize';
import loggerLinkImported from 'apollo-link-logger';
import { Platform } from '@ionic/angular';
import { EntityUtils } from '../../entity.model';
import { isNil, isNotEmptyArray, isNotNil, toNumber } from '../../../functions';
import { Resolvers } from '@apollo/client/core/types';
import { HttpHeaders } from '@angular/common/http';
import { HttpLink, Options } from 'apollo-angular/http';
import { persistCache, PersistentStorage } from 'apollo3-cache-persist';
import { ErrorPolicy, MutationBaseOptions } from '@apollo/client/core/watchQueryOptions';
import { Cache } from '@apollo/client/cache/core/types/Cache';
import { AppError, PropertiesMap } from '../../../types';
import { isMobile } from '../../../platforms';
import { StorageService } from '../../storage/storage.service';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ClientOptions, createClient } from 'graphql-ws';
import { unwrapESModule } from '../../../modules';
import { createFragmentRegistry } from '@apollo/client/cache/inmemory/fragmentRegistry';
import { DocumentNode } from 'graphql';
import { environment } from '@environments/environment';
import { RxStartableService, RxStartableServiceOptions } from '@app/shared/services/rx-startable-service.class';
import { Peer, Peers } from '../peer.model';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
// Workaround for issue https://github.com/ng-packagr/ng-packagr/issues/2215
const QueueLink = unwrapESModule(queueLinkImported);
const SerializingLink = unwrapESModule(serializingLinkImported);
const loggerLink = unwrapESModule(loggerLinkImported);

export interface WatchQueryOptions<V> {
  query: any;
  variables?: V;
  error?: AppError;
  fetchPolicy?: WatchQueryFetchPolicy;
}

export interface MutateQueryOptions<T, V = OperationVariables> extends MutationBaseOptions<T, V> {
  mutation: any;
  variables?: V;
  error?: AppError;
  context?: {
    serializationKey?: string;
    tracked?: boolean;
    timeout?: number;
  };
  optimisticResponse?: T;
  offlineResponse?: T | ((context: any) => Promise<T>);
  update?: MutationUpdaterFn<T>;
  forceOffline?: boolean;
}

export const APP_GRAPHQL_TYPE_POLICIES = new InjectionToken<TypePolicies>('graphqlTypePolicies');

export const APP_GRAPHQL_FRAGMENTS = new InjectionToken<DocumentNode[]>('graphqlFragments');

export interface ConnectionParams extends Record<string, string> {}

export interface GraphqlServiceState {
  peer: Peer;
  client: ApolloClient<any>;
  offline: boolean;
}

@Directive()
export abstract class GraphqlService<
  S extends GraphqlServiceState,
  O extends RxStartableServiceOptions<S> = RxStartableServiceOptions<S>,
> extends RxStartableService<S, O> {
  //private readonly _networkStatusChanged$: Observable<ConnectionType>;

  protected readonly defaultFetchPolicy: FetchPolicy = environment.graphql?.fetchPolicy;
  protected readonly defaultWatchFetchPolicy: WatchQueryFetchPolicy = environment.graphql?.watchFetchPolicy;
  protected apollo = inject(Apollo);

  private platform = inject(Platform);
  private httpLink = inject(HttpLink);
  private httpParams: Options;
  private wsParams: ClientOptions<ConnectionParams>;
  private connectionParams: ConnectionParams = {};
  private onNetworkError = new Subject<any>();
  private customErrors: PropertiesMap = {};

  @RxStateSelect() offline$: Observable<boolean>;
  @RxStateSelect() client$: Observable<ApolloClient<never>>;

  @RxStateProperty() peer: Peer;
  @RxStateProperty() client: ApolloClient<never>;
  @RxStateProperty() offline: boolean;

  get online(): boolean {
    return !this.offline;
  }

  get cache(): ApolloCache<never> {
    return this.client?.cache;
  }

  get fetchPolicy(): FetchPolicy {
    return this.offline ? 'cache-only' : this.defaultFetchPolicy;
  }

  get watchFetchPolicy(): WatchQueryFetchPolicy {
    return this.offline ? 'cache-only' : this.defaultWatchFetchPolicy;
  }

  protected constructor(
    private storage: StorageService,
    private typePolicies?: TypePolicies,
    private fragments?: DocumentNode[],
    options?: O
  ) {
    super(storage, {
      name: 'graphql',
      ...options,
      initialState: <S>{
        offline: false,
        ...options?.initialState,
      },
    }); // Wait platform

    // Listen network status
    //this._networkStatusChanged$ = network.onNetworkStatusChanges.pipe(filter(isNotNil), distinctUntilChanged());

    // When getting network error: try to ping peer, and toggle to offline
    // this.onNetworkError
    //   .pipe(
    //     throttleTime(300),
    //     filter(() => this.network.online),
    //     mergeMap(() => this.network.checkPeerAlive()),
    //     filter((alive) => !alive)
    //   )
    //   .subscribe(() => this.network.setForceOffline(true, { showToast: true }));
  }

  /**
   * Allow to add a field resolver
   *  (see doc: https://www.apollographql.com/docs/react/data/local-state/#handling-client-fields-with-resolvers)
   *
   * @param resolvers
   */
  async addResolver(resolvers: Resolvers | Resolvers[]) {
    if (!this.started) await this.ready();
    this.apollo.client.addResolvers(resolvers);
  }

  async query<T, V = EmptyObject>(opts: { query: any; variables?: V; error?: AppError; fetchPolicy?: FetchPolicy }): Promise<T> {
    if (!this.started) await this.ready();
    let res: ApolloQueryResult<T>;
    try {
      res = await this.client.query<T, V>({
        query: opts.query,
        variables: opts.variables,
        fetchPolicy: opts.fetchPolicy || this.fetchPolicy || undefined,
      });
    } catch (err) {
      res = this.toApolloError<T>(err, opts.error);
    }
    if (res.errors) {
      throw res.errors[0];
    }
    return res.data;
  }

  watchQueryRef<T, V = EmptyObject>(opts: WatchQueryOptions<V>): QueryRef<T, V> {
    return this.apollo.watchQuery<T, V>({
      query: opts.query,
      variables: opts.variables,
      fetchPolicy: opts.fetchPolicy || this.watchFetchPolicy || undefined,
      notifyOnNetworkStatusChange: true,
    });
  }

  queryRefValuesChanges<T, V = EmptyObject>(queryRef: QueryRef<T, V>, opts: WatchQueryOptions<V>): Observable<T> {
    return queryRef.valueChanges.pipe(
      catchError((error) => this.onApolloError<T>(error, opts.error)),
      filter((value) => value.networkStatus === NetworkStatus.ready || value.networkStatus === NetworkStatus.error),
      map(({ data, errors }) => {
        if (errors) {
          throw errors[0];
        }
        return data;
      })
    );
  }

  watchQuery<T, V = EmptyObject>(opts: WatchQueryOptions<V>): Observable<T> {
    const queryRef: QueryRef<T, V> = this.watchQueryRef(opts);
    return this.queryRefValuesChanges(queryRef, opts);
  }

  async mutate<T, V = EmptyObject>(opts: MutateQueryOptions<T, V>): Promise<T> {
    // If offline, compute an optimistic response for tracked queries
    if ((opts.forceOffline || this.offline) && opts.offlineResponse) {
      if (typeof opts.offlineResponse === 'function') {
        opts.context = opts.context || {};
        const optimisticResponseFn = opts.offlineResponse as (context: any) => Promise<T>;
        opts.optimisticResponse = await optimisticResponseFn(opts.context);
        if (this._debug) console.debug('[graphql] [offline] Using an optimistic response: ', opts.optimisticResponse);
      } else {
        opts.optimisticResponse = opts.offlineResponse as T;
      }
      if (opts.forceOffline) {
        const res = { data: opts.optimisticResponse };
        if (opts.update) {
          opts.update(this.apollo.client.cache, res);
        }
        return res.data;
      }
    }

    const res = await firstValueFrom(
      this.apollo
        .mutate<ApolloQueryResult<T>, V>({
          mutation: opts.mutation,
          variables: opts.variables,
          context: opts.context,
          optimisticResponse: opts.optimisticResponse as any,
          update: opts.update as any,
        })
        .pipe(
          catchError((error) => this.onApolloError<T>(error, opts.error)),
          first()
          // To debug, if need:
          //tap((res) => (!res) && console.error('[graphql] Unknown error during mutation. Check errors in console (may be an invalid generated cache id ?)'))
        )
    );
    if (Array.isArray(res.errors)) {
      throw res.errors[0];
    }
    return res.data as T;
  }

  subscribeQuery<T, V = EmptyObject>(
    opts: {
      query: any;
      variables: V;
      fetchPolicy?: FetchPolicy;
      errorPolicy?: ErrorPolicy;
      error?: AppError;
    },
    extra?: ExtraSubscriptionOptions
  ): Observable<T> {
    return this.apollo
      .subscribe<T>(
        {
          query: opts.query,
          fetchPolicy: (opts && opts.fetchPolicy) || 'network-only',
          errorPolicy: (opts && opts.errorPolicy) || undefined,
          variables: opts.variables,
        },
        {
          useZone: true,
          ...extra,
        }
      )
      .pipe(
        catchError((error) => this.onApolloError<T>(error, opts.error)),
        map(({ data, errors }) => {
          if (errors) {
            throw errors[0];
          }
          return data;
        })
      );
  }

  insertIntoQueryCache<T, V = EmptyObject>(
    cache: ApolloCache<any>,
    opts: Cache.ReadQueryOptions<V, any> & {
      arrayFieldName: string;
      totalFieldName?: string;
      data: T;
      sortFn?: (d1: T, d2: T) => number;
      size?: number;
    }
  ) {
    cache = cache || this.apollo.client.cache;
    opts.arrayFieldName = opts.arrayFieldName || 'data';

    try {
      let data = cache.readQuery<any, V>({ query: opts.query, variables: opts.variables });

      if (!data) return; // Skip: nothing in cache

      if (isNotNil(data[opts.arrayFieldName])) {
        // Copy because immutable
        data = { ...data };

        // Append to result array
        data[opts.arrayFieldName] = [...data[opts.arrayFieldName], { ...opts.data }];

        // Resort, if need
        if (opts.sortFn) {
          data[opts.arrayFieldName].sort(opts.sortFn);
        }

        // Exclude if exceed max size
        const size = toNumber(opts.variables && opts.variables['size'], -1);
        if (size > 0 && data[opts.arrayFieldName].length > size) {
          data[opts.arrayFieldName].splice(size, data[opts.arrayFieldName].length - size);
        }

        // Increment total
        if (isNotNil(opts.totalFieldName)) {
          if (isNotNil(data[opts.totalFieldName])) {
            data[opts.totalFieldName] += 1;
          } else {
            console.warn('[graphql] Unable to update cached query. Unknown result part: ' + opts.totalFieldName);
          }
        }

        cache.writeQuery({
          query: opts.query,
          variables: opts.variables,
          data,
        });
      } else {
        console.warn('[graphql] Unable to update cached query. Unknown result part: ' + opts.arrayFieldName);
      }
    } catch (err) {
      // continue
      // read in cache is not guaranteed to return a result. see https://github.com/apollographql/react-apollo/issues/1776#issuecomment-372237940
      if (this._debug) console.error('[graphql] Error while updating cache: ', err);
    }
  }

  addManyToQueryCache<T = any, V = EmptyObject>(
    cache: ApolloCache<any>,
    opts: Cache.ReadQueryOptions<V, any> & {
      arrayFieldName: string;
      totalFieldName?: string;
      data: T[];
      equalsFn?: (d1: T, d2: T) => boolean;
      sortFn?: (d1: T, d2: T) => number;
    }
  ) {
    if (!opts.data || !opts.data.length) return; // nothing to process

    cache = cache || this.apollo.client.cache;
    opts.arrayFieldName = opts.arrayFieldName || 'data';

    try {
      let data = cache.readQuery<any, V>({ query: opts.query, variables: opts.variables });
      if (!data) return 0; // skip

      if (data[opts.arrayFieldName]) {
        // Copy because immutable
        data = { ...data };

        // Keep only not existing res
        const equalsFn = opts.equalsFn || ((d1, d2) => d1['id'] === d2['id'] && d1['entityName'] === d2['entityName']);
        const newItems = opts.data.filter(
          (inputValue) => data[opts.arrayFieldName].findIndex((existingValue) => equalsFn(inputValue, existingValue)) === -1
        );

        if (!newItems.length) return; // No new value

        // Append to array
        data[opts.arrayFieldName] = [...data[opts.arrayFieldName], ...newItems];

        // Resort, if need
        if (opts.sortFn) {
          data[opts.arrayFieldName].sort(opts.sortFn);
        }

        // Exclude if exceed max size
        const size = toNumber(opts.variables && opts.variables['size'], -1);
        if (size > 0 && data[opts.arrayFieldName].length > size) {
          data[opts.arrayFieldName].splice(size, data[opts.arrayFieldName].length - size);
        }

        // Increment the total
        if (isNotNil(opts.totalFieldName)) {
          if (isNotNil(data[opts.totalFieldName])) {
            data[opts.arrayFieldName] += newItems.length;
          } else {
            console.warn('[graphql] Unable to update cached query. Unknown result part: ' + opts.totalFieldName);
          }
        }

        // Write to cache
        cache.writeQuery({
          query: opts.query,
          variables: opts.variables,
          data,
        });
      } else {
        console.warn('[graphql] Unable to update cached query. Unknown result part: ' + opts.arrayFieldName);
      }
    } catch (err) {
      // continue
      // read in cache is not guaranteed to return a result. see https://github.com/apollographql/react-apollo/issues/1776#issuecomment-372237940
      if (this._debug) console.warn('[graphql] Error while updating cache: ', err);
    }
  }

  /**
   * Remove from cache, and return if removed or not
   *
   * @param cache
   * @param opts
   */
  removeFromCachedQueryById<V = EmptyObject, ID = number>(
    cache: ApolloCache<any>,
    opts: Cache.ReadQueryOptions<V, any> & {
      arrayFieldName: string;
      totalFieldName?: string;
      ids: ID; // Do NOT use 'id', as already used by the Apollo API
    }
  ): boolean {
    cache = cache || this.apollo.client.cache;
    opts.arrayFieldName = opts.arrayFieldName || 'data';

    try {
      let data = cache.readQuery<any, V>({ query: opts.query, variables: opts.variables });

      if (data && data[opts.arrayFieldName]) {
        // Copy because immutable
        data = { ...data };

        const index = data[opts.arrayFieldName].findIndex((item) => item['id'] === opts.ids);
        if (index === -1) return false; // Skip (nothing removed)

        // Copy, then remove deleted item
        data[opts.arrayFieldName] = data[opts.arrayFieldName].slice();
        const deletedItem = data[opts.arrayFieldName].splice(index, 1)[0];
        cache.evict({ id: cache.identify(deletedItem) });

        // Decrement the total
        if (isNotNil(opts.totalFieldName)) {
          if (isNotNil(data[opts.totalFieldName])) {
            data[opts.totalFieldName] -= 1;
          } else {
            console.warn('[graphql] Unable to update cached query. Unknown result part: ' + opts.totalFieldName);
          }
        }

        // Write to cache
        cache.writeQuery({
          query: opts.query,
          variables: opts.variables,
          data,
        });
        return true;
      } else {
        console.warn('[graphql] Unable to update cached query. Unknown result part: ' + opts.arrayFieldName);
        return false;
      }
    } catch (err) {
      // continue
      // read in cache is not guaranteed to return a result. see https://github.com/apollographql/react-apollo/issues/1776#issuecomment-372237940
      if (this._debug) console.warn('[graphql] Error while removing from cache: ', err);
      return false;
    }
  }

  /**
   * Remove ids from cache, and return the number of items removed
   *
   * @param cache
   * @param opts
   */
  removeFromCachedQueryByIds<V = EmptyObject, ID = number>(
    cache: ApolloCache<any>,
    opts: Cache.ReadQueryOptions<V, any> & {
      arrayFieldName: string;
      totalFieldName?: string;
      ids: ID[];
    }
  ): number {
    cache = cache || this.apollo.client.cache;
    opts.arrayFieldName = opts.arrayFieldName || 'data';

    try {
      let data = cache.readQuery(opts);

      if (data && data[opts.arrayFieldName]) {
        // Copy because immutable
        data = { ...data };

        const deletedIndexes = data[opts.arrayFieldName].reduce((res, item, index) => (opts.ids.includes(item['id']) ? res.concat(index) : res), []);

        if (deletedIndexes.length <= 0) return 0; // Skip (nothing removed)

        // Query has NO total
        if (isNil(opts.totalFieldName)) {
          // Evict each object
          deletedIndexes
            .map((index) => data[opts.arrayFieldName][index])
            .map((item) => cache.identify(item))
            .forEach((id) => cache.evict({ id }));
        }
        // Query has a total
        else {
          // Copy the array
          data[opts.arrayFieldName] = data[opts.arrayFieldName].slice();

          // remove from array, then evict
          deletedIndexes
            // Reverse: to keep valid index
            .reverse()
            // Remove from the array
            .map((index) => data[opts.arrayFieldName].splice(index, 1)[0])
            // Evict from cache
            .map((item) => cache.identify(item))
            .forEach((id) => cache.evict({ id }));

          if (isNotNil(data[opts.totalFieldName])) {
            data[opts.totalFieldName] -= deletedIndexes.length; // Remove deletion count
          } else {
            console.warn('[graphql] Unable to update the total in cached query. Unknown result part: ' + opts.totalFieldName);
          }

          cache.writeQuery({
            query: opts.query,
            variables: opts.variables,
            data,
          });

          return deletedIndexes.length;
        }
      } else {
        console.warn('[graphql] Unable to update cached query. Unknown result part: ' + opts.arrayFieldName);
        return 0;
      }
    } catch (err) {
      // continue
      // read in cache is not guaranteed to return a result. see https://github.com/apollographql/react-apollo/issues/1776#issuecomment-372237940
      if (this._debug) console.warn('[graphql] Error while removing from cache: ', err);
      return 0;
    }
  }

  updateToQueryCache<T extends object, V = EmptyObject>(
    cache: ApolloCache<any>,
    opts: Cache.ReadQueryOptions<V, any> & {
      arrayFieldName: string;
      totalFieldName?: string;
      data: T;
      equalsFn?: (d1: T, d2: T) => boolean;
      idAttribute?: keyof T;
    }
  ) {
    cache = cache || this.apollo.client.cache;
    opts.arrayFieldName = opts.arrayFieldName || 'data';

    try {
      let data: any = cache.readQuery(opts);

      if (data && data[opts.arrayFieldName]) {
        // Copy because immutable
        data = { ...data };

        const equalsFn = opts.equalsFn || ((d1, d2) => EntityUtils.equals(d1, d2, opts.idAttribute));

        // Update if exists, or insert
        const index = data[opts.arrayFieldName].findIndex((v) => equalsFn(opts.data, v));
        if (index !== -1) {
          data[opts.arrayFieldName] = data[opts.arrayFieldName].slice().splice(index, 1, opts.data);
        } else {
          data[opts.arrayFieldName] = [...data[opts.arrayFieldName], opts.data];
        }

        // Increment total (if changed)
        if (isNotNil(opts.totalFieldName) && index === -1) {
          if (isNotNil(data[opts.totalFieldName])) {
            data[opts.totalFieldName] += 1;
          } else {
            console.warn('[graphql] Unable to update cached query. Unknown result part: ' + opts.totalFieldName);
          }
        }

        cache.writeQuery({
          query: opts.query,
          variables: opts.variables,
          data,
        });
        return; // OK: stop here
      }
    } catch (err) {
      // continue
      // read in cache is not guaranteed to return a result. see https://github.com/apollographql/react-apollo/issues/1776#issuecomment-372237940
      if (this._debug) console.warn('[graphql] Error while updating cache: ', err);
    }
  }

  async clearCache(client?: ApolloClient<any>): Promise<void> {
    client = (client || this.client) as ApolloClient<any>;
    if (client) {
      console.info('[graphql] Cleaning cache... ');
      const now = this._debug && Date.now();

      // Clearing the cache
      await client.cache.reset();

      if (this._debug) console.debug(`[graphql] Cleaning cache [OK] in ${Date.now() - now}ms`);
    }
  }

  registerCustomError(error: PropertiesMap) {
    this.customErrors = { ...this.customErrors, ...error };
  }

  /* -- protected methods -- */

  protected async createClient(peer: Peer, name?: string) {
    name = name || this.options?.name || 'default';
    if (!peer) throw Error('Missing peer. Unable to start graphql service');

    console.info(`${this._logPrefix}Creating Apollo GraphQL client '${name}'...`);
    const mobile = isMobile(window);
    const enableMutationTrackerLink = !mobile;

    const httpUri = Peers.getHttpUri(peer);
    console.info(`${this._logPrefix}Base uri: ${httpUri}`);

    const wsUri = Peers.getWsUri(peer) + '/websocket';
    console.info(`${this._logPrefix}Subscription uri: ${wsUri}`);

    this.httpParams = this.httpParams || {};
    this.httpParams.uri = httpUri;

    this.wsParams = {
      ...this.wsParams,
      lazy: true,
      connectionParams: this.connectionParams,
      webSocketImpl: AppWebSocket,
      url: wsUri,
      shouldRetry: (errOrCloseEvent) => {
        // If WS URL changed, then do not retry
        if (wsUri !== this.wsParams.url) {
          return false;
        }
        console.warn(`${this._logPrefix}[WS] Trying to reconnect...`, errOrCloseEvent);
        return true;
      },
      retryAttempts: 10,
    };

    // Create a storage configuration
    const storage: PersistentStorage<string> = new StorageServiceWrapper(this.storage);

    // Remove existing client
    const oldClient = this.apollo.use(name)?.client;
    if (oldClient) {
      await this.resetClient(oldClient);
      this.apollo.removeClient(name);
    }

    // Websocket link
    const wsLink = new GraphQLWsLink(createClient(this.wsParams));

    // Retry when failed link
    const retryLink = new RetryLink();
    const authLink = new ApolloLink((operation, forward) => {
      const authorization = [];
      if (this.connectionParams.authToken) {
        authorization.push(`token ${this.connectionParams.authToken}`);
      }
      if (this.connectionParams.authBasic) {
        authorization.push(`Basic ${this.connectionParams.authBasic}`);
      }
      const headers = new HttpHeaders().append('Authorization', authorization);

      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        ...operation.getContext(),
        ...{ headers },
      });

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    // Http link
    const httpLink = this.httpLink.create(this.httpParams);

    // Cache
    const cache = new InMemoryCache({
      typePolicies: this.typePolicies,
      fragments: isNotEmptyArray(this.fragments) ? createFragmentRegistry(...this.fragments) : undefined,
    });

    // Add cache persistence
    if (environment.graphql.persistCache) {
      console.debug(`${this._logPrefix}Starting persistence cache...`);
      await persistCache({
        cache,
        storage,
        trigger: this.platform.is('android') ? 'background' : 'write',
        debounce: 1000,
        debug: true,
      });
    }

    let mutationLinks: Array<ApolloLink>;

    // Add queue to store tracked queries, when offline
    if (enableMutationTrackerLink) {
      const serializingLink = new SerializingLink();
      const trackerLink = new TrackerLink({
        storage,
        debounce: 1000,
        debug: this._debug,
      });
      this.stopSubject.subscribe(trackerLink.destroy);

      // Creating a mutation queue
      const queueLink = new QueueLink();
      this.registerSubscription(
        this.offline$.subscribe((offline) => {
          // Network is offline: start buffering into queue
          if (offline) {
            console.info(`${this._logPrefix}offline mode: enable mutations buffer`);
            trackerLink.enable();
            queueLink.close();
          }
          // Network is online
          else {
            console.info(`${this._logPrefix}online mode: disable mutations buffer`);
            trackerLink.disable();
            queueLink.open();
          }
        })
      );
      mutationLinks = [loggerLink, queueLink, trackerLink, queueLink, serializingLink, retryLink, authLink, httpLink];
    } else {
      mutationLinks = [retryLink, authLink, httpLink];
    }

    // Create Apollo client
    this.apollo.createNamed(name, {
      cache,
      defaultOptions: {
        query: {
          fetchPolicy: this.defaultFetchPolicy,
        },
        watchQuery: {
          fetchPolicy: this.defaultWatchFetchPolicy,
        },
      },
      link: ApolloLink.split(
        // Handle mutations
        isMutationOperation,
        ApolloLink.from(mutationLinks),

        ApolloLink.split(
          // Handle subscriptions
          isSubscriptionOperation,
          wsLink,

          // Handle queries
          ApolloLink.from([retryLink, authLink, httpLink])
        )
      ),
      connectToDevTools: !environment.production,
    });

    const client = this.apollo.use(name).client;

    // Enable tracked queries persistence
    if (enableMutationTrackerLink && environment.graphql.persistCache) {
      try {
        await restoreTrackedQueries({
          client,
          storage,
          debug: this._debug,
        });
      } catch (err) {
        console.error(`${this._logPrefix}Failed to restore tracked queries from storage: ` + ((err && err.message) || err), err);
      }
    }

    console.info(`${this._logPrefix}Creating graphql client [OK]`);
    return client;
  }

  protected async ngOnStop() {
    console.info(`${this._logPrefix}Stopping...`);

    const client = this.client;
    if (client) {
      await this.resetClient(client);
    }
  }

  protected async resetClient(client?: ApolloClient<any>) {
    client = (client || this.apollo.client) as ApolloClient<any>;
    if (!client) return;

    console.info('[graphql] Resetting Apollo client...');
    client.stop();

    await Promise.all([client.clearStore(), this.clearCache(client)]);
  }

  private onApolloError<T>(err: any, defaultError?: any): Observable<ApolloQueryResult<T>> {
    return of(this.toApolloError<T>(err, defaultError));
  }

  private toApolloError<T>(err: ApolloError, defaultError?: AppError): ApolloQueryResult<T> {
    let error =
      // If network error: try to convert to App (read as JSON), or create an UNKNOWN_NETWORK_ERROR
      (err.networkError &&
        ((err.networkError.error && this.toAppError(err.networkError.error)) ||
          this.toAppError(err.networkError) ||
          (err.networkError.error && this.createAppErrorByCode(err.networkError.error.status)) ||
          this.createAppErrorByCode(ErrorCodes.UNKNOWN_ERROR))) ||
      // If graphQL: try to convert the first error found
      (err.graphQLErrors && err.graphQLErrors.length && this.toAppError(err.graphQLErrors[0])) ||
      this.toAppError(err) ||
      this.toAppError(err.originalError) ||
      (err.graphQLErrors && err.graphQLErrors[0]) ||
      err;
    console.error('[graphql] ' + ((error && error.message) || error), error.stack || '');
    if (error?.code === ErrorCodes.UNKNOWN_ERROR && err.networkError?.message) {
      console.error('[graphql] original error: ' + err.networkError.message);
      this.onNetworkError.next(error);
    }

    // Apply default error, and store original error into error's details
    if ((!error || !error.code || error.code === ServerErrorCodes.INTERNAL_SERVER_ERROR) && defaultError) {
      error = { ...(defaultError as AppError), details: error, stack: err.stack };
      if (defaultError.message) {
        error.message = defaultError.message;
      }
    }

    return {
      data: null,
      errors: [error],
      loading: false,
      networkStatus: NetworkStatus.error,
    };
  }

  private createAppErrorByCode(errorCode: number): any | undefined {
    const message = this.getI18nErrorMessageByCode(errorCode);
    if (message) {
      return {
        code: errorCode,
        message,
      };
    }
    return undefined;
  }

  private getI18nErrorMessageByCode(errorCode: number): string | undefined {
    // look in registered error codes
    const customErrorMessage = this.customErrors[errorCode];
    if (customErrorMessage) {
      return customErrorMessage;
    }

    // Default, switch on error code
    switch (errorCode) {
      case ServerErrorCodes.UNAUTHORIZED:
        return 'ERROR.UNAUTHORIZED';
      case ServerErrorCodes.FORBIDDEN:
        return 'ERROR.FORBIDDEN';
      case ErrorCodes.UNKNOWN_ERROR:
        return 'ERROR.UNKNOWN_ERROR';
    }

    return undefined;
  }

  private toAppError(err: string | AppError | ApolloError): AppError | undefined {
    const error: AppError | ApolloError = typeof err === 'object' ? err : { message: err };
    // parse message if JSON
    if (typeof error.message === 'string' && error.message.trim().indexOf('{"code":') === 0) {
      try {
        const json = JSON.parse(
          error.message
            // Remove special characters before parsing (e.g. SQL errors from an Oracle database)
            .replace('\n', ' ')
            .replace('\r', '')
        ) as AppError;
        error.message = json.message || error.message;
      } catch (parseError) {
        console.error('Unable to parse error as JSON: ', parseError);
      }
    }
    if (error.code) {
      const appError: AppError = {
        ...error,
        ...this.createAppErrorByCode(error.code),
      };
      if (appError.code !== error.code || appError.message !== error.message) {
        // Store original error in details
        appError.details = error as AppError;
        return appError;
      }
      // Keep error (with details, if any)
      return error as AppError;
    }
    return undefined;
  }
}
