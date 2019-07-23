import {Injectable} from "@angular/core";
import {DuniterErrorCodes} from "./duniter.errors";
import {LocalSettingsService} from "../local-settings.service";
import {GvaService} from "./gva/gva.service";
import {NetworkService} from "../network/network.service";
import {BmaService} from "./bma/bma.service";
import {PendingIdentity, Source} from "./duniter.model";
import {Observable} from "rxjs";
import {FetchPolicy, WatchQueryFetchPolicy} from "apollo-client";


export declare interface FetchOptions {
  fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';
}
export declare interface WatchFetchOptions {
  fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby' | 'cache-and-network';
}
export interface IPeerApiService {
  /**
   * Check is an UID exists or not
   * @param pubkey
   * @prams options
   */
  isUidExists: (uid: string) => Promise<boolean>;

  /**
   * Load sources
   * @param pubkey
   * @prams options
   */
  sourcesOfPubkey: (pubkey: string, options?: WatchFetchOptions) => Observable<Source[]>;

  /**
   * Get pending identities
   * @param search
   * @prams options
   */
  pendingIdentities: (search: string, options?: WatchFetchOptions) => Observable<PendingIdentity[]>;
}



@Injectable({providedIn: 'root'})
export class DuniterService implements IPeerApiService {

  private _delegate: IPeerApiService;

  private readonly _debug: boolean;

  get delegate(): IPeerApiService {
    // TODO: switch depending on peer API
    return this.gvaService;
  }

  constructor(
      protected networkService: NetworkService,
      protected gvaService: GvaService,
      protected bmaService: BmaService
  ) {
    this._debug = true;

    networkService.onStart.subscribe(() => {
      const peer = networkService.peer;
      if (peer.hasEndpoint('GVA')) {
        this._delegate = this.gvaService;
      }
      else {
        //this._delegate = this.bmaService;
      }
    })
  }

  /**
   * Check if uid is available for new account registration.
   * Throw an error if not available
   * @param uid
   */
  public async checkUidAvailable(uid: string): Promise<void> {
    const isUidExists = await this.isUidExists(uid);
    if (isUidExists) {
      throw { code: DuniterErrorCodes.UID_ALREADY_REGISTERED, message: "ERROR.UID_ALREADY_REGISTERED" };
    }
  }

  /**
   * Check if uid is exists in network.
   * @param uid
   */
  isUidExists(uid: string): Promise<boolean> {
    return this.delegate.isUidExists(uid);
  }

  /**
   * Load sources
   * @param pubkey
   */
  sourcesOfPubkey(pubkey: string, options?: WatchFetchOptions): Observable<Source[]> {
    return this.delegate.sourcesOfPubkey(pubkey, options);
  }

  pendingIdentities(search: string, options?: WatchFetchOptions): Observable<PendingIdentity[]> {
    return this.delegate.pendingIdentities(search, options);
  }

  async authenticateAndGetToken(token?: string): Promise<string> {
    // TODO: add to IPeerService
    return null;
  }

  /* -- Protected methods -- */

}
