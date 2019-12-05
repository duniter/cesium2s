import {Injectable} from "@angular/core";
import {NetworkService} from "../../network/network.service";
import {HttpClient} from "@angular/common/http";
import {Peer} from "../../network/network.model";
import {Observable, of} from "rxjs";
import {BlockchainParameters, NodeSummary, PendingIdentity, Source} from "../duniter.model";
import {catchError, map} from "rxjs/operators";
import {LoadResult, sliceResult, WatchFetchOptions} from "../../../../shared/services/data-service.class";
import {IDuniterService} from "../duniter.service";
import {isNilOrBlank} from "../../../../shared/functions";
import {BmaLookupkupResult, BmaMembership, BmaNodeSummary} from "./bma.model";
import {BmaErrorCodes} from "./bma.errors";


@Injectable({providedIn: 'root'})
export class BmaService implements IDuniterService {

  private readonly _debug: boolean;

  private _peer: Peer;
  private _peerUrl: string;

  constructor(
      protected network: NetworkService,
      protected http: HttpClient
  ) {
    this._debug = true;

    this.network.onStart.subscribe(() => {
      this._peer = this.network.peer;
      this._peerUrl = this._peer.url;
    });
  }

  currency(): Observable<string> {
    return this.blockchainParameters()
        .pipe(map(p => p.currency));
  }

  blockchainParameters(): Observable<BlockchainParameters> {
    return this.network.watch(this._peerUrl + '/blockchain/parameters');
  }

  async nodeSummary(peer?: Peer): Promise<NodeSummary> {
    const peerUrl = peer && peer.url || this._peerUrl;
    const res = await this.network.get<BmaNodeSummary>(peerUrl + '/node/summary');
    return res && res.duniter;
  }

  /**
   * Check if uid is exists in network.
   * @param uid
   */
  async isUidExists(uid: string): Promise<boolean> {

    if (this._debug) console.debug(`[bma] Checking if ${uid} exists...`);

    const res = await this.network.get<{results: any[];}>(this._peerUrl + '/wot/lookup/' + uid);
    console.log("TODO: check res: ", res);

    return res && res.results && res.results.length > 0 || false;
  }

  /**
   * Load sources
   * @param pubkey
   */
  sourcesOfPubkey(pubkey: string, options?: WatchFetchOptions): Observable<LoadResult<Source>> {

    if (this._debug) console.debug(`[bma] Loading sources of ${pubkey.substring(0, 8)}...`);

    return this.network.watch<{sources: Source[];}>(this._peerUrl + '/tx/sources/' + pubkey)
        .pipe(
          map(res => sliceResult(res && res.sources || [], options))
        );
  }

  pendingIdentities(search: string, options?: WatchFetchOptions): Observable<LoadResult<PendingIdentity>> {
    if (this._debug) console.debug(`[bma] Loading pending identities (search=${search})...`);

    if (isNilOrBlank(search)) {
      return this.network.watch<{memberships: BmaMembership[];}>(this._peerUrl + '/wot/pending')
          .pipe(
              map(res => sliceResult(res && res.memberships || [], options))
          );
    }
    else {
      return this.network.watch<{results: BmaLookupkupResult[]; }>(this._peerUrl + '/wot/lookup/' + search)
          .pipe(
              catchError(err => {
                  if (err && err.ucode === BmaErrorCodes.NO_MATCHING_IDENTITY) {
                      return of({results: []});
                  }
                 throw err;
              }),
              map(res => {
                return res && (res.results || []).reduce((res, item) => {
                  return res.concat((item.uids || []).map(itemUid => {
                    return {
                      pubkey: item.pubkey,
                      uid: itemUid.uid
                    };
                  }));
                }, []);
              }),
              map(res => sliceResult(res, options))
          );
    }
  }

  /* -- Protected methods -- */

}
