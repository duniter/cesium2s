import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from '@ionic/storage';
import {environment} from "../../../../environments/environment";
import {Observable, Subject, Subscription} from "rxjs";
import {CryptoService, LocalSettingsService, NetworkService, Peer} from "../../../core/core.module";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, timeout} from "rxjs/operators";
import {EsEndpointApis, EsOptions} from "../es.constants";
import {NodeSummary} from "../../../core/services/duniter/duniter.model";


export declare type SelectPeerCallback = (peers: Peer[], options?: {allowSelectDownPeer: boolean; }) => Promise<Peer>;
const noop = (_) => null;

@Injectable()
export class EsNetworkService {

  private _debug = false;
  private _peer: Peer;
  private _peerUrl: string;
  private _startPromise: Promise<any>;
  private _started = false;
  private _subscriptions: Subscription[] = [];
  private _selectPeerCallback: SelectPeerCallback = noop;

  onStart = new Subject<Peer>();

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

  get peerUrl(): string {
    return this._peerUrl;
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
    private network: NetworkService
  ) {
    this.resetData();

    // Start the service
    this.start();

    // For DEV only
    this._debug = !environment.production;
  }

  async start(peer?: Peer): Promise<any> {
    if (this._startPromise) return this._startPromise;
    if (this._started) return;

    console.info("[es-network] Starting ES network...");

    this._subscriptions.push(this.network.onStatusChanges.subscribe((type) => {
      console.info("[es-network] TODO: analyse new network status:" + type);
    }));

    // Restoring local settings
    this._startPromise = this.settings.ready()
      .then(async () => {

        const peerUrl = this.settings.getProperty(EsOptions.PEER_URL.key);
        let peer = peerUrl && Peer.parseUrl(peerUrl);

        // No peer: ask user to choose
        if (this._selectPeerCallback !== noop) {
          if (!peer) console.debug("[es-network] No peer defined in settings. Asking user to choose a peer.");
          while (!peer || !(await this.checkPeerAlive(peer))) {
            peer = await this._selectPeerCallback(await this.getDefaultPeers(), {allowSelectDownPeer: false});
          }
        }
        else if (peer) {
          await this.checkPeerAlive(peer);
        }

        if (!peer || !peer.reachable) {
          throw new Error(`[es-network] Peer {${peer.url} is unreachable.`);
        }

        console.debug(`[es-network] Will use peer {${peer.url}}`);
        this._peer = peer;
        this._peerUrl = peer.url;
        this._started = true;
        this._startPromise = undefined;
        this.onStart.next(peer);
      })
      .then(() => this.settings.setProperty(EsOptions.PEER_URL.key, this._peer.url))
      .catch((err) => {
        console.error(err && err.message || err, err);
        this.resetData();
        this._started = false;
        this._startPromise = undefined;
      });
    return this._startPromise;
  }

  ready(): Promise<boolean> {
    if (this._started) return Promise.resolve(true);
    return this.start().then(() => this._started);
  }

  async stop() {
    this.resetData();
    this._started = false;
    this._startPromise = undefined;

    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }

  /**
   * Check if the peer is alive
   * @param email
   */
  async checkPeerAlive(peer: Peer): Promise<boolean> {

    let reachable = false;
    peer.endpoints = peer.endpoints || [];

    try  {
      const summary = await this.nodeSummary(peer);
      if (summary) {
        reachable = true;
        peer.endpoints.push(EsEndpointApis.CORE);
        peer.softwareName = summary.duniter.software;
        peer.softwareVersion = summary.duniter.version;
      }
    }
    catch(err) {
      console.error(err);
    }

    peer.status = reachable ? 'UP' : 'DOWN';

    return peer.reachable;
  }

  async nodeSummary(peer?: Peer): Promise<NodeSummary> {
    peer = peer || this._peer;
    return await this.network.get(peer.url + '/node/summary');
  }

  setSelectPeerCallback(callback: SelectPeerCallback) {
    this._selectPeerCallback = callback;
  }

  async selectPeer(options?: {allowSelectDownPeer: boolean; }): Promise<Peer> {

    return await this._selectPeerCallback(await this.getDefaultPeers(), options);
  }

  async query<T>(path: string, opts: {
    query: any,
    variables?: any,
    params: any
  }) {
    let uri = this._peer.url + path;
    uri = opts.variables && this.network.prepareUri(uri, opts.variables) || uri;
    return this.network.post(uri, opts.query, {params: opts.params});
  }

  /* -- Protected methods -- */

  protected resetData() {
    this._peer = null;
    this._peerUrl = undefined;
  }


  get<T>(path: string, opts?: {
    timeout?: number,
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Promise<T> {
    return this.watch<T>(path, opts).toPromise();
  }

  post<T>(path: string,
          body: any,
          opts?: {
            timeout?: number,
            params?: HttpParams | {
              [param: string]: string | string[];
            };
          }): Promise<T> {
    return this.watchPost<T>(path, body, opts).toPromise();
  }

  watch<T>(path: string, opts?: {
    timeout?: number,
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    const uri = this._peer.url + path;
    return this.network.watch(uri, opts);
  }

  watchPost<T>(path: string,
               body: any,
               opts?: {
    timeout?: number,
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    const uri = this._peer.url + path;
    return this.network.watchPost(uri, body, opts);
  }

  /**
   * Get default peers, from environment
   */
  protected async getDefaultPeers(): Promise<Peer[]> {
    const configPeers = (environment.defaultPeers || []).concat(environment.defaultPeer && [environment.defaultPeer] || []);
    const peers = configPeers.map(item => {
      return Peer.fromObject({
        dns: item.host,
        port: item.port
      });
    });
    return Promise.resolve(peers);
  }

}
