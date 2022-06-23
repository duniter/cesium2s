import {Injectable} from "@angular/core";
import {AppBaseService} from "./base.service";
import {ApiPromise, WsProvider} from "@polkadot/api";

import * as types from "@duniter/core-types/interfaces/runtime/definitions";
import {SettingsService} from "./settings.service";
import {PlatformService} from "./platform.service";
import {firstNotNilPromise} from "../shared/observables";
import {Peer} from "../model/peer.model";
import {PeerUtils} from "../shared/peers";


@Injectable({providedIn: 'root'})
export class PeerService extends AppBaseService {

  private _api: ApiPromise;

  get api(): ApiPromise {
    return this._api
  }

  constructor(
    protected platform: PlatformService,
    private settings: SettingsService
  ) {
    super(platform, {
      name: 'node-service'
    });
  }

  protected async doStart(): Promise<any> {

    await this.settings.ready();
    const settings = await firstNotNilPromise(this.settings.value$);

    const peers = await this.filterAliveNodes(settings.preferredPeers);
    if (!peers.length) {
      throw {message: 'ERROR.CHECK_NETWORK_CONNECTION'};
    }

    const peer = this.selectRandomPeer(peers);
    const wsUri = PeerUtils.getWsUri(peer);
    this.info(`Connecting to peer {${wsUri}}...`)

    // Construct
    const wsProvider = new WsProvider(wsUri);
    const api = await ApiPromise.create({
      provider: wsProvider,
      ...types
    });

    // Read the genesys block hash
    this.info("Connected to Blockchain genesis: " + api.genesisHash.toHex());

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();

    // Log the information
    this.info(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    this._api = api;
  }

  async filterAliveNodes(peers: Peer[], opts?: {
    timeout?: number;
  }): Promise<Peer[]> {
      const result: Peer[] = [];
      await Promise.all(peers
        .map(peer => this.isPeerAlive(peer).then(alive => {
            if (!alive) return;
            result.push(peer);
        }))
      );
      return result;
  }

  async isPeerAlive(peer: Peer, opts?: {
    timeout?: number;
  }): Promise<boolean> {
      // TODO
    return Promise.resolve(true);
  }

  selectRandomPeer(peers: Peer[]): Peer {
    var index = Math.floor(Math.random() * peers.length);
    return peers[index];
  }
}
