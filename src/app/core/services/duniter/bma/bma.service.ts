import {Injectable} from "@angular/core";
import {NetworkService} from "../../network/network.service";
import {HttpClient} from "@angular/common/http";
import {Peer} from "../../network/network.model";
import {WatchFetchOptions} from "../duniter.service";
import {Observable} from "rxjs";
import {Source} from "../duniter.model";
import {map} from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class BmaService {

  private readonly _debug: boolean;

  private _peer: Peer;

  constructor(
      protected network: NetworkService,
      protected http: HttpClient
  ) {
    this._debug = true;

    this.network.onStart.subscribe(() => {
      this._peer = this.network.peer;
    });
  }

  /**
   * Check if uid is exists in network.
   * @param uid
   */
  async isUidExists(uid: string): Promise<boolean> {

    if (this._debug) console.debug(`[bma] Checking if ${uid} exists...`);

    const res = await this.network.get<{results: any[];}>(this._peer.url + '/wot/lookup/' + uid);
    console.log("TODO: check res: ", res);

    return res && res.results && res.results.length > 0 || false;
  }

  /**
   * Load sources
   * @param pubkey
   */
  loadSources(pubkey: string, options?: WatchFetchOptions): Observable<Source[]> {

    if (this._debug) console.debug(`[bma] Loading sources of ${pubkey.substring(0, 8)}...`);

    return this.network.watch<{sources: Source[];}>(this._peer.url + '/tx/sources/' + pubkey)
        .pipe(
          map(res => {
            console.log("TODO: check sources res: ", res);
            return res && res.sources || [];
          })
        );
  }



  /* -- Protected methods -- */

}
