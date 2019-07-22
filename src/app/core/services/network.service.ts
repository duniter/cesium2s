import {EventEmitter, Injectable} from "@angular/core";
import {CryptoService} from "./crypto.service";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from '@ionic/storage';
import {environment} from "../../../environments/environment";
import {Peer} from "./model";
import {ModalController} from "@ionic/angular";
import {SelectPeerModal} from "../peer/select-peer.modal";
import {Subject, Subscription} from "rxjs";
import {LocalSettingsService, SETTINGS_STORAGE_KEY} from "./local-settings.service";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {HttpClient} from "@angular/common/http";
import {toBoolean} from "../../shared/shared.module";
import { Network } from '@ionic-native/network/ngx';

export interface NodeInfo {
  softwareName: string;
  softwareVersion: string;
  nodeLabel?: string;
  nodeName?: string;
}

@Injectable()
export class NetworkService {

  private _debug = false;
  private _peer: Peer;
  private _startPromise: Promise<any>;
  private _started = false;
  private _subscriptions: Subscription[] = [];

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
    private modalCtrl: ModalController,
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
          peer = await this.showSelectPeerModal({allowSelectDownPeer: false});
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
      await this.getNodeInfo(peer);
      return true;
    } catch (err) {
      return false;
    }
  }

  getNodeInfo(peer: string | Peer): Promise<NodeInfo> {
    const peerUrl = (peer instanceof Peer) ? peer.url : (peer as string);
    return this.get(peerUrl + '/api/node/info');
  }

  /* -- Protected methods -- */

  protected resetData() {
    this._peer = null;
  }


  protected async get<T>(uri: string): Promise<T> {
    try {
      return (await this.http.get(uri).toPromise()) as T;
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


  public async showSelectPeerModal(opts?: {allowSelectDownPeer?: boolean;}): Promise<Peer | undefined> {

    opts = opts || {};

    const $peers = new Subject();

    const modal = await this.modalCtrl.create({
      component: SelectPeerModal,
      componentProps: {
        peers: $peers,
        canCancel: false,
        allowSelectDownPeer: toBoolean(opts.allowSelectDownPeer, true)
      },
      keyboardClose: true,
      showBackdrop: true
    });
    await modal.present();

    const peers = await this.getDefaultPeers();
    $peers.next(peers || []);

    return modal.onDidDismiss()
      .then((res) => {
        return res && res.data && (res.data as Peer) || undefined;
      });
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
