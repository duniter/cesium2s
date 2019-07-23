import {EventEmitter, Injectable} from "@angular/core";
import {CryptoService} from "../crypto.service";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from '@ionic/storage';
import {environment} from "../../../../environments/environment";
import {Peer, PeerEndpointApi} from "./network.model";
import {Observable, Subject, Subscription} from "rxjs";
import {LocalSettingsService, SETTINGS_STORAGE_KEY} from "../local-settings.service";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Network} from '@ionic-native/network/ngx';
import {catchError, map, timeout} from "rxjs/operators";

export interface NodeSummary {
  duniter: {
    software: string;
    version: string;
    forkWindowSize: number;
  };
}

export declare type SelectPeerCallback = (peers: Peer[], options?: {allowSelectDownPeer: boolean; }) => Promise<Peer>;

@Injectable()
export class NetworkService {

  private _debug = false;
  private _peer: Peer;
  private _startPromise: Promise<any>;
  private _started = false;
  private _subscriptions: Subscription[] = [];
  private _selectPeerCallback: SelectPeerCallback = () => null;

  public onStart = new Subject<Peer>();


  public getNetworkStatusChanges = new EventEmitter<any>();

  get peer(): Peer {
    return this._peer && this._peer.clone();
  }

  set peer(peer: Peer) {
    if (this._started) {
      this.stop()
        .then(() => this.start(peer));
    } else {
      this.start(peer);
    }
  }

  get started(): boolean {
    return this._started;
  }

  constructor(
    private translate: TranslateService,
    private cryptoService: CryptoService,
    private storage: Storage,
    private http: HttpClient,
    private splashScreen: SplashScreen,
    private settings: LocalSettingsService,
    private network: Network
  ) {
    this.resetData();

    // Start the service
    this.start();

    // For DEV only
    this._debug = true;
  }

  public async start(peer?: Peer): Promise<any> {
    if (this._startPromise) return this._startPromise;
    if (this._started) return;

    console.info("[network] Starting network...");

    this._subscriptions.push(this.network.onDisconnect().subscribe(() => {
      console.info("[network] Disconnected");
      this.getNetworkStatusChanges.emit(false);
    }));

    this._subscriptions.push(this.network.onConnect().subscribe(() => {
      console.info(`[network] Connection {${this.network.type}}`);
      this.getNetworkStatusChanges.emit(this.network.type);
    }));

    // Restoring local settings
    this._startPromise = (!peer && this.restoreLocally() || Promise.resolve(peer))
      .then(async (peer: Peer | undefined) => {

        // Make sure to hide the splashscreen, before open the modal
        if (!peer) this.splashScreen.hide();

        // No peer in settings: ask user to choose
        while (!peer) {
          console.debug("[network] No peer defined. Asking user to choose a peer.");
          peer = await this._selectPeerCallback(await this.getDefaultPeers(), {allowSelectDownPeer: false});
        }
        this._peer = peer;
        this._started = true;
        this._startPromise = undefined;

        this.onStart.next(peer);
      })
      .catch((err) => {
        console.error(err && err.message || err, err);
        this._started = false;
        this._startPromise = undefined;
      })

      // Wait settings starts, then save peer in settings
      .then(() => this.settings.ready())
      .then(() => this.settings.saveLocalSettings({peerUrl: this._peer.url}));
    return this._startPromise;
  }

  ready(): Promise<any> {
    if (this._started) return Promise.resolve();
    return this.start();
  }

  async stop() {
    this.resetData();
    this._started = false;
    this._startPromise = undefined;

    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }

  /**
   * Try to restore peer from the local storage
   */
  async restoreLocally(): Promise<Peer | undefined> {

    // Restore from storage
    const settingsStr = await this.storage.get(SETTINGS_STORAGE_KEY);
    const settings = settingsStr && JSON.parse(settingsStr) || undefined;
    if (settings && settings.peerUrl) {
      console.debug(`[network] Use peer {${settings.peerUrl}} (found in the local storage)`);
      return Peer.parseUrl(settings.peerUrl);
    }

    // Return the default peer, if exists
    return environment.defaultPeer && Peer.fromObject(environment.defaultPeer);
  }

  /**
   * Check if the peer is alive
   * @param email
   */
  async checkPeerAlive(peer: string | Peer): Promise<boolean> {
    try {
      await this.getNodeSummaryUsingBMA(peer);
      if (peer instanceof Peer) {
        peer.endpointApis = ['BMA'];
      }
      return true;
    } catch (err) {
    }
    try {
      await this.getNodeSummaryUsingGVA(peer);
      if (peer instanceof Peer) {
        peer.endpointApis = ['GVA'];
      }
      return true;
    } catch (err) {
    }
    return false;
  }

  getNodeSummaryUsingBMA(peer: string | Peer): Promise<NodeSummary> {
    const peerUrl = (peer instanceof Peer) ? peer.url : (peer as string);
    return this.get(peerUrl + '/node/summary');
  }

  async getNodeSummaryUsingGVA(peer: string | Peer): Promise<NodeSummary> {
    const peerUrl = (peer instanceof Peer) ? peer.url : (peer as string);
    const uri = peerUrl + '/graphql';
    const res = await this.grapqhQuery<{nodeSummary: NodeSummary}>(uri, '{ nodeSummary {duniter {software version, forkWindowSize} }}');
    return res && res.nodeSummary;
  }

  async refreshPeerStatus(peer: Peer): Promise<Peer> {
    let summary: NodeSummary;

    // Try GVA
    if (!summary) {
      try {
        summary = await this.getNodeSummaryUsingGVA(peer.url);
        //peer.api = 'GVA';
      } catch (err) {
        console.error(`[select-peer] Could not access GVA on {${peer.url}}: ${err && err.statusText}`);
      }
    }

    // Try BMA
    if (!summary) {
      try {
        summary = await this.getNodeSummaryUsingBMA(peer);
        //peer.api = 'BMA';
      } catch (err) {
        console.error(`[select-peer] Could not access BMA on {${peer.url}}: ${err && err.statusText}`);
      }
    }

    // Try WS2P
    // const wsUri = String.prototype.replace.call(peer.url, "http", "ws");
    // if (!summary) {
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


    if (summary) {
      peer.status = 'UP';
      peer.softwareName = summary.duniter && summary.duniter.software;
      peer.softwareVersion = summary.duniter && summary.duniter.version;
      //peer.label = summary.nodeLabel;
      //peer.name = summary.nodeName;
    }
    else {
      peer.status = 'DOWN';
    }

    return peer;
  }

  setSelectPeerCallback(callback: SelectPeerCallback) {
    this._selectPeerCallback = callback;
  }

  async selectPeer(options?: {allowSelectDownPeer: boolean; }): Promise<Peer> {

    return await this._selectPeerCallback(await this.getDefaultPeers(), options);
  }

  /* -- Protected methods -- */

  protected resetData() {
    this._peer = null;
  }


  async get<T>(uri: string, options?: {
    timeout?: number,
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Promise<T> {
    return await this.watch(uri, options).toPromise() as T;
  }

  watch<T>(uri: string, options?: {
    timeout?: number,
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {

    const requestOptions = {
      params: options && options.params,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    return this.http.get(uri, requestOptions)
        .pipe(
            // Add timeout
            timeout(options && options.timeout || environment.timeout || 500),
            // If error
            catchError(err => {
              if (err && err.message) {
                console.error("[network] " + err.message);
              }
              else {
                console.error(`[network] Error on get request ${uri}: ${err.status}`);
              }
              throw {code: err.status, message: "ERROR.UNKNOWN_NETWORK_ERROR"};
            }),
            map(res => res as T)
        );
  }

  async grapqhQuery<T>(uri: string,
                       query: any,
                       variables?: any,
                       options?: {
                          timeout?: number,
                          params?: HttpParams | {
                            [param: string]: string | string[];
                          };
                        }): Promise<T> {
    const bodyString = JSON.stringify({query: query, variables: variables});
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const requestOptions = {
      params: options && options.params,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
      const res: any = await this.http.post(uri, bodyString, requestOptions)
          // Add timeout
          .pipe(timeout(options && options.timeout || environment.timeout || 500))
          .toPromise();
      return res && res.data as T;
    } catch (err) {
      if (err && err.message) {
        console.error("[network] " + err.message);
      }
      else {
        console.error(`[network] Error on get request ${uri}: ${err.status}`);
      }
      throw {code: err.status, message: "ERROR.UNKNOWN_NETWORK_ERROR"};
    }
  }

  /**
   * Get default peers, from environment
   */
  protected async getDefaultPeers(): Promise<Peer[]> {
    const peers = (environment.defaultPeers || []).map(item => {
      return Peer.fromObject({
        dns: item.host,
        port: item.port
      });
    });
    return Promise.resolve(peers);
  }

}
