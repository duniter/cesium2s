import {Injectable} from "@angular/core";
import {DuniterErrorCodes} from "./duniter.errors";
import {GvaService} from "./gva/gva.service";
import {NetworkService, PeerRefreshEvent} from "../network/network.service";
import {BmaService} from "./bma/bma.service";
import {BlockchainParameters, NodeSummary, PendingIdentity, Source} from "./duniter.model";
import {DuniterEndpointApis, WellKnownCurrencies} from "./duniter.constants";
import {Observable} from "rxjs";
import {LoadResult, WatchFetchOptions} from "../../../shared/shared.module";
import {Peer} from "../network/network.model";
import {map} from "rxjs/operators";


export interface IDuniterService {

  currency(): Observable<string>;

  /**
   * Get node summary
   */
  nodeSummary(): Promise<NodeSummary>;

  /**
   * Get node summary
   */
  blockchainParameters(): Observable<BlockchainParameters>;

  /**
   * Check is an UID exists or not
   * @param pubkey
   * @prams options
   */
  isUidExists(uid: string): Promise<boolean>;

  /**
   * Load sources
   * @param pubkey
   * @prams options
   */
  sourcesOfPubkey(pubkey: string, options?: WatchFetchOptions): Observable<LoadResult<Source>>;

  /**
   * Get pending identities
   * @param search
   * @prams options
   */
  pendingIdentities(search: string, options?: WatchFetchOptions): Observable<LoadResult<PendingIdentity>>;
}



@Injectable({providedIn: 'root'})
export class DuniterService implements IDuniterService {

  private _delegate: IDuniterService;
  private _started = false;

  private readonly _debug: boolean;

  get delegate(): IDuniterService {
    return this._delegate;
  }

  constructor(
      protected networkService: NetworkService,
      protected gvaService: GvaService,
      protected bmaService: BmaService
  ) {
    this._debug = true;

    networkService.onStart.subscribe(() => {
      const peer = networkService.peer;
      // Switch depending on peer API
      if (peer.hasEndpoint('GVA')) {
        this._delegate = this.gvaService;
      }
      else {
        this._delegate = this.bmaService;
      }
      this._started = true;
    });

    networkService.onRefreshPeerStatus.subscribe( async (event: PeerRefreshEvent) => {
      await this.checkPeerAlive(event.peer);
      event.done();
    });
  }

  ready(): Promise<boolean> {
    return this.networkService.ready();
  }

  /**
   * Check if the peer is alive
   * @param email
   */
  async checkPeerAlive(peer: Peer): Promise<boolean> {
    let summary: NodeSummary;
    let reachable = false;

    peer.endpoints = peer.endpoints || [];

    // Try BMA
    try {
      summary = await this.bmaService.nodeSummary(peer);
      if (summary && !peer.hasEndpoint(DuniterEndpointApis.BMA)) {
        reachable = true;
        peer.endpoints.push(DuniterEndpointApis.BMA);
        peer.softwareName = summary.duniter && summary.duniter.software;
        peer.softwareVersion = summary.duniter && summary.duniter.version;
      }
    } catch (err) {
      // Continue
    }

    // Try GVA
    if (!reachable) {
      try {
        summary = await this.gvaService.nodeSummary(peer);
        if (summary && !peer.hasEndpoint(DuniterEndpointApis.GVA)) {
          reachable = true;
          peer.status = 'UP';
          peer.endpoints.push(DuniterEndpointApis.GVA);
          peer.softwareName = summary.duniter && summary.duniter.software;
          peer.softwareVersion = summary.duniter && summary.duniter.version;
        }
      } catch (err) {
        // Continue
      }
    }

    // Try WS2P
    // const wsUri = String.prototype.replace.call(peer.url, "http", "ws");
    // if (!reacheable) {
    //   await new Promise((resolve, reject) => {
    //     try {
    //       const ws = new AppWebSocket(wsUri + '/ws2p');
    //       ws.onopen = () => {
    //         console.error(`[select-peer] Opened !!`);
    //         peer.status = 'UP';
    //         ws.close();
    //         resolve(peer);
    //       };
    //       ws.onerror = (err) => {
    //         console.error(`[select-peer] Error`);
    //         resolve(peer);
    //       };
    //     } catch (err) {
    //       console.error(`[select-peer] Could not access WS2P on {${wsUri}}: ${err && err.statusText}`);
    //       resolve(peer);
    //     }
    //   });
    // }

    peer.status = reachable ? 'UP' : 'DOWN';
    return reachable;
  }

  /**
   * Check if uid is available for new account registration.
   * Throw an error if not available
   * @param uid
   */
  async checkUidAvailable(uid: string): Promise<void> {
    const isUidExists = await this.isUidExists(uid);
    if (isUidExists) {
      throw { code: DuniterErrorCodes.UID_ALREADY_REGISTERED, message: "ERROR.UID_ALREADY_REGISTERED" };
    }
  }

  /* -- delegate methods (from IPeerApiService) -- */

  currencySymbol(): Observable<string> {
    return this.delegate.currency()
        .pipe(map(currency => {
          const knownCurrency = WellKnownCurrencies.find(c => c.currency === currency);
          return knownCurrency && knownCurrency.symbol || currency;
        }));
  }

  currency(): Observable<string> {
    return this.delegate.currency();
  }

  nodeSummary(): Promise<NodeSummary> {
    return this.delegate.nodeSummary();
  }

  blockchainParameters(): Observable<BlockchainParameters> {
    return this.delegate.blockchainParameters();
  }

  isUidExists(uid: string): Promise<boolean> {
    return this.delegate.isUidExists(uid);
  }

  sourcesOfPubkey(pubkey: string, options?: WatchFetchOptions): Observable<LoadResult<Source>> {
    return this.delegate.sourcesOfPubkey(pubkey, options);
  }

  pendingIdentities(search: string, options?: WatchFetchOptions): Observable<LoadResult<PendingIdentity>> {
    return this.delegate.pendingIdentities(search, options);
  }

  async authenticateAndGetToken(token?: string): Promise<string> {
    // TODO: add to IPeerService
    return null;
  }

  /* -- Protected methods -- */

}
