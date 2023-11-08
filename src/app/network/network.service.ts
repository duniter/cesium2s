import {Injectable} from "@angular/core";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {SettingsService} from "../settings/settings.service";
import {Peer, Peers} from "./peer.model";
import {StartableService} from "@app/shared/services/startable-service.class";
import {abbreviate} from "@app/shared/currencies";
import {Currency} from "@app/network/currency.model";
//import * as definitions from '@duniter/core-types/interfaces'

const WELL_KNOWN_CURRENCIES = Object.freeze({
  'Ğdev': <Partial<Currency>>{
    network: "gdev",
    displayName: 'Ğdev',
    symbol: 'GD',
    prefix: 42,
    genesis: '0x9f956a87b5568f12c757bb3426897bba6123a1ef311fcd0945bd669fd0e612f8',
    fees: {
      identity: 300, // = 3 Gdev
      tx: 1 // = 0.01 Gdev
    },
    decimals: 2
  },
  'Ğ1': <Partial<Currency>>{
    network: "g1",
    displayName: 'Ğ1',
    symbol: 'G1',
    prefix: 4450,
    genesis: '0x___TODO___',
    fees: {
      identity: 300, // = 3G1 - FIXME
      tx: 1 // = 0.01 G1 - FIXME
    },
    decimals: 2 // FIXME remove for autodetection
  }
});

@Injectable({providedIn: 'root'})
export class NetworkService extends StartableService<ApiPromise> {

  currency = <Currency>{
    displayName: null,
    symbol: null,
    genesis: null
  }

  get api(): ApiPromise {
    return this._data;
  }

  get currencySymbol(): string {
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

    // Get the chain information
    const chainInfo = await api.registry.getChainProperties();
    const chain = '' + (await api.rpc.system.chain());
    const genesis = api.genesisHash.toHex();

    console.info(`${this._logPrefix}Connecting to chain {${chain}}: `, chainInfo.toHuman());

    // Check is well known currency
    if (WELL_KNOWN_CURRENCIES[chain]) {
      const wellKnownCurrency = WELL_KNOWN_CURRENCIES[chain];
      if (wellKnownCurrency.genesis && wellKnownCurrency.genesis !== genesis) {
        console.warn(`${this._logPrefix}Invalid genesis for ${chain}! Expected ${wellKnownCurrency.genesis} but peer return ${genesis}`);
      }
      else {
        this.currency = WELL_KNOWN_CURRENCIES[chain];
      }
    }
    this.currency.displayName = this.currency.displayName || chain;
    this.currency.symbol = this.currency.symbol || chainInfo.tokenSymbol.value?.[0].toHuman() || abbreviate(this.currency.displayName);
    this.currency.decimals = this.currency.decimals || +(chainInfo.tokenDecimals.value?.[0].toHuman()) || 0;

    // Read the genesis block hash
    console.debug(`${this._logPrefix}Blockchain symbol: ${this.currency.symbol}`);
    console.debug(`${this._logPrefix}Blockchain decimals: ${this.currency.decimals}`);
    console.debug(`${this._logPrefix}Blockchain genesis: ${genesis}`);

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    console.info(`${this._logPrefix}Last block: #${lastHeader.number} - hash ${lastHeader.hash}`);

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
