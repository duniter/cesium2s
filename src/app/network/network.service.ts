import {Injectable} from "@angular/core";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {SettingsService} from "../settings/settings.service";
import {Peer, Peers} from "./peer.model";
import {StartableService} from "@app/shared/services/startable-service.class";
//import * as definitions from '@duniter/core-types/interfaces'

const WELL_KNOWN_CURRENCIES = {
  'Ğdev': {
    symbol: 'ĞD'
  }
}
@Injectable({providedIn: 'root'})
export class NetworkService extends StartableService<ApiPromise> {

  chain = {
    name: null,
    symbol: null
  }

  get api(): ApiPromise {
    return this._data;
  }

  get currencySign(): string {
    // TODO
    return 'GD'
  }

  constructor(
    private settings: SettingsService
  ) {
    super(settings, {
      name: 'network-service'
    });
  }

  protected async ngOnStart(): Promise<any> {

    const settings = await this.settings.ready();

    const peers = await this.filterAliveNodes(settings.preferredPeers);
    if (!peers.length) {
      throw {message: 'ERROR.CHECK_NETWORK_CONNECTION'};
    }

    const peer = this.selectRandomPeer(peers);
    const wsUri = Peers.getWsUri(peer);
    console.info(`Connecting to peer {${wsUri}}...`)

    // Extract all types from definitions - fast and dirty approach, flatted on 'types'
    // const types = Object.values(definitions).reduce((res: any, { types }): object => {
    //   return { ...res, ...types };
    // }, {});
    // this.log(types);

    // Construct
    const wsProvider = new WsProvider(wsUri);
    const api = await ApiPromise.create({
      provider: wsProvider
      //,...types
    });

    // get the chain information
    const chainInfo = await api.registry.getChainProperties();
    this.debug('Connecting to chain: ', chainInfo);

    // Read the genesys block hash
    console.info('Connected to Blockchain genesis: ' + api.genesisHash.toHex());

    // Retrieve the chain name
    const chain = ''+(await api.rpc.system.chain());
    this.chain = WELL_KNOWN_CURRENCIES[chain];

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();

    // Log the information
    console.info(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    return api;
  }

  async filterAliveNodes(peers: string[], opts?: {
    timeout?: number;
  }): Promise<Peer[]> {
      const result: Peer[] = [];
      await Promise.all(peers
        .map(peer => Peers.fromUri(peer))
        .map(peer => this.isPeerAlive(peer)
          .then(alive => {
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
    const index = Math.floor(Math.random() * peers.length);
    return peers[index];
  }
}
