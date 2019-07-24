import {EventEmitter, Injectable} from "@angular/core";
import {CryptoService} from "../crypto.service";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from '@ionic/storage';
import {environment} from "../../../../environments/environment";
import {Peer} from "./network.model";
import {Observable, Subject, Subscription} from "rxjs";
import {LocalSettingsService, SETTINGS_STORAGE_KEY} from "../local-settings.service";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Network} from '@ionic-native/network/ngx';
import {catchError, map, timeout} from "rxjs/operators";
import {isNotEmptyArray} from "../../../shared/functions";


export declare type SelectPeerCallback = (peers: Peer[], options?: { allowSelectDownPeer: boolean; }) => Promise<Peer>;

export declare interface PeerRefreshEvent {
    peer: Peer;

    done();
}

@Injectable()
export class NetworkService {

    private _debug = false;
    private _peer: Peer;
    private _startPromise: Promise<any>;
    private _started = false;
    private _subscriptions: Subscription[] = [];
    private _selectPeerCallback: SelectPeerCallback = () => null;

    onStart = new Subject<Peer>();
    onRefreshPeerStatus = new EventEmitter<PeerRefreshEvent>(true);

    public onStatusChanges = new EventEmitter<any>();

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
        this._debug = !environment.production;
    }

    async start(peer?: Peer): Promise<any> {
        if (this._startPromise) return this._startPromise;
        if (this._started) return;

        console.info("[network] Starting network...");

        this._subscriptions.push(this.network.onDisconnect().subscribe(() => {
            console.info("[network] Disconnected");
            this.onStatusChanges.emit(false);
        }));

        this._subscriptions.push(this.network.onConnect().subscribe(() => {
            console.info(`[network] Connection {${this.network.type}}`);
            this.onStatusChanges.emit(this.network.type);
        }));

        // Restoring local settings
        this._startPromise = (!peer && this.restoreLocally() || Promise.resolve(peer))
            .then(async (peer: Peer | undefined) => {

                // Make sure to hide the splashscreen, before open the modal
                if (!peer) this.splashScreen.hide();

                // No peer in settings: ask user to choose
                while (!peer || !(await this.checkPeerAlive(peer))) {
                    console.debug("[network] No peer defined. Asking user to choose a peer.");
                    peer = await this._selectPeerCallback(await this.getDefaultPeers(), {allowSelectDownPeer: false});
                }
                if (isNotEmptyArray(peer.endpoints)) console.debug(`[network] Will use peer {${peer.url} with endpoints {${(peer.endpoints || []).join(',')}}`);
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
     * Try to restore peer from the local storage
     */
    async restoreLocally(): Promise<Peer | undefined> {

        // Restore from storage
        const settingsStr = await this.storage.get(SETTINGS_STORAGE_KEY);
        const settings = settingsStr && JSON.parse(settingsStr) || undefined;
        if (settings && settings.peerUrl) {
            console.debug(`[network] Find peer {${settings.peerUrl}} in the local storage`);
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
        const peerObj: Peer = (peer instanceof Peer) ? peer : Peer.parseUrl(peer as string);

        // reset endpoints, then refresh peer status
        peerObj.endpoints = [];
        await this.refreshPeerStatus(peerObj);

        return peerObj.reachable;
    }

    async refreshPeerStatus(peer: Peer): Promise<Peer> {
        await new Promise(resolve => {
            const observerCount = this.onRefreshPeerStatus.observers.length;
            let counter = 0;
            this.onRefreshPeerStatus.emit({
                peer: peer,
                done: () => {
                    counter++;
                    if (counter === observerCount) {
                        resolve();
                    }
                }
            });
        });
        return peer;
    }

    setSelectPeerCallback(callback: SelectPeerCallback) {
        this._selectPeerCallback = callback;
    }

    async selectPeer(options?: { allowSelectDownPeer: boolean; }): Promise<Peer> {

        return await this._selectPeerCallback(await this.getDefaultPeers(), options);
    }

    prepareUri(uri: string, params: any) {
        const pkeys = (typeof params === 'object') ? Object.getOwnPropertyNames(params) : [];
        const queryParams = {};

        let newUri = uri;

        // Replace all ':key' found in path with value
        pkeys.forEach(pkey => {
            const prevURI = newUri;
            newUri = newUri.replace(':' + pkey, params[pkey]);
            if (prevURI === newUri) {
                queryParams[pkey] = params[pkey];
            }
        });

        // Add missing params as ?key=value
        newUri = Object.getOwnPropertyNames(queryParams).reduce((prevURI, qkey, index) => {
            return prevURI + ((index === 0) ? '?' : '&') + qkey + '=' + queryParams[qkey];
        }, newUri);

        return newUri;
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

    async post<T>(uri: string, body: any, options?: {
        params?: HttpParams | {
            [param: string]: string | string[];
        };
    }): Promise<T> {
        return await this.watchPost(uri, body, options).toPromise() as T;
    }

    watchPost<T>(uri: string, body: any, options?: {
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

        return this.http.post(uri, body, requestOptions)
            .pipe(
                // Add timeout
                timeout(options && options.timeout || environment.timeout || 500),
                // If error
                catchError(err => {
                    if (err && err.error && err.error.message) {
                        console.error(`[network] {${uri}} response an error: ${err.error.message}`);
                        throw err.error;
                    }
                    if (err && err.message) {
                        console.error("[network] " + err.message);
                    } else {
                        console.error(`[network] Error on get request ${uri}: ${err.status}`);
                    }
                    throw {code: err.status, message: "ERROR.UNKNOWN_NETWORK_ERROR"};
                }),
                map(res => res as T)
            );
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
                    if (err && err.error && err.error.message) {
                        console.error(`[network] {${uri}} response an error: ${err.error.message}`);
                        throw err.error;
                    }
                    if (err && err.message) {
                        console.error("[network] " + err.message);
                    } else {
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
            } else {
                console.error(`[network] Error on get request ${uri}: ${err.status}`);
            }
            throw {code: err.status, message: "ERROR.UNKNOWN_NETWORK_ERROR"};
        }
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
