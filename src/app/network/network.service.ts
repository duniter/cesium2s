import {Injectable} from "@angular/core";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {SettingsService} from "../settings/settings.service";
import {Peer, Peers} from "./peer.model";
import {StartableService} from "@app/shared/services/startable-service.class";
import {abbreviate} from "@app/shared/currencies";
import {Currency} from "@app/network/currency.model";
import {cryptoWaitReady} from "@polkadot/util-crypto";
//import * as definitions from '@duniter/core-types/interfaces'

const WELL_KNOWN_CURRENCIES = Object.freeze({
  'Ğdev': <Currency>{
    name: 'Ğdev',
    symbol: 'ĞD',
    ss58Format: 42,
    genesys: '0x096baa94878da1965c8a7929212f4e7a5f6a813cdcbbb401603b39e5e470b6e0'
  },
  'Ğ1': <Currency>{
    name: 'Ğ1',
    symbol: 'Ğ1',
    ss58Format: 42,
    genesys: '0x___TODO___'
  }
});

@Injectable({providedIn: 'root'})
export class NetworkService extends StartableService<ApiPromise> {

  currency = <Currency>{
    name: null,
    symbol: null,
    genesys: null
  }

  get api(): ApiPromise {
    return this._data;
  }

  get currencySign(): string {
    return this.currency.symbol || '';
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
    console.info(`${this._logPrefix}Connecting to peer {${wsUri}}...`)

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
    console.debug(`${this._logPrefix}Connecting to chain: `, chainInfo.toHuman());

    // Read the genesys block hash
    console.info(`${this._logPrefix}Blockchain genesis: ` + api.genesisHash.toHex());

    // Retrieve the chain name
    const chain = '' + (await api.rpc.system.chain());
    if (WELL_KNOWN_CURRENCIES[chain]) {
      this.currency = WELL_KNOWN_CURRENCIES[chain];
    }
    this.currency.symbol = this.currency.symbol || abbreviate(this.currency.name);

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    console.info(`${this._logPrefix}${this.currency.name} - last block #${lastHeader.number} has hash ${lastHeader.hash}`);

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
