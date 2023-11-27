import {Injectable} from '@angular/core';
import {ApiPromise, WsProvider} from '@polkadot/api';
import {SettingsService} from '../settings/settings.service';
import {Peer, Peers} from './peer.model';
import {abbreviate} from '@app/shared/currencies';
import {Currency} from '@app/network/currency.model';
import {RxStartableService} from "@app/shared/services/rx-startable-service.class";
import {RxStateProperty} from "@app/shared/decorator/state.decorator";

const WELL_KNOWN_CURRENCIES = Object.freeze({
  Ğdev: <Partial<Currency>>{
    network: 'gdev',
    displayName: 'Ğdev',
    symbol: 'GD',
    prefix: 42,
    genesis:
      '0x9f956a87b5568f12c757bb3426897bba6123a1ef311fcd0945bd669fd0e612f8',
    fees: {
      identity: 300, // = 3 Gdev
      tx: 1, // = 0.01 Gdev
    },
    decimals: 2,
  },
  Ğ1: <Partial<Currency>>{
    network: 'g1',
    displayName: 'Ğ1',
    symbol: 'G1',
    prefix: 4450,
    genesis: '0x___TODO___',
    fees: {
      identity: 300, // = 3G1 - FIXME
      tx: 1, // = 0.01 G1 - FIXME
    },
    decimals: 2, // FIXME remove for autodetection
  },
});

export interface NetworkState {
  currency: Currency;
  api: ApiPromise
}

@Injectable({ providedIn: 'root' })
export class NetworkService extends RxStartableService<NetworkState> {

  @RxStateProperty() currency: Currency;
  @RxStateProperty() api: ApiPromise;

  @RxStateProperty<NetworkState>('currency', 'symbol') currencySymbol: string;

  constructor(private settings: SettingsService) {
    super(settings, {
      name: 'network-service',
    });
  }

  protected async ngOnStart(): Promise<any> {
    const settings = await this.settings.ready();

    const peers = await this.filterAliveNodes(settings.preferredPeers);
    if (!peers.length) {
      throw { message: 'ERROR.CHECK_NETWORK_CONNECTION' };
    }

    const peer = this.selectRandomPeer(peers);
    const wsUri = Peers.getWsUri(peer);
    console.info(`${this._logPrefix}Connecting to peer {${wsUri}}...`);

    // Extract all types from definitions - fast and dirty approach, flatted on 'types'
    // const types = Object.values(definitions).reduce((res: any, { types }): object => {
    //   return { ...res, ...types };
    // }, {});
    // this.log(types);

    // Construct
    const wsProvider = new WsProvider(wsUri);
    const api = await ApiPromise.create({
      provider: wsProvider,
      //,...types
    });

    // Log API
    //console.debug(`${this._logPrefix}API loaded [${Object.keys(api).join(',')}]`)

    // Get the chain information
    const chainInfo = await api.registry.getChainProperties();
    const chain = '' + (await api.rpc.system.chain());
    const genesis = api.genesisHash.toHex();

    console.info(
      `${this._logPrefix}Connecting to chain {${chain}}: `,
      chainInfo.toHuman()
    );

    let currency: Currency;
    // Check is well known currency
    if (WELL_KNOWN_CURRENCIES[chain]) {
      const wellKnownCurrency = WELL_KNOWN_CURRENCIES[chain];
      if (wellKnownCurrency.genesis && wellKnownCurrency.genesis !== genesis) {
        console.warn(
          `${this._logPrefix}Invalid genesis for ${chain}! Expected ${wellKnownCurrency.genesis} but peer return ${genesis}`
        );
      } else {
        currency = { ...wellKnownCurrency };
      }
    }
    else {
      console.warn(`${this._logPrefix}Not a well known currency: ${chain}!`);
    }
    currency.displayName = currency.displayName || chain;
    currency.symbol = currency.symbol || chainInfo.tokenSymbol.value?.[0].toHuman() || abbreviate(this.currency.displayName);
    currency.decimals = currency.decimals || +chainInfo.tokenDecimals.value?.[0].toHuman() || 0;
    currency.genesis = genesis;

    // Read the genesys block hash
    console.debug(`${this._logPrefix}Blockchain symbol: ${currency.symbol}`);
    console.debug(`${this._logPrefix}Blockchain decimals: ${currency.decimals}`);
    console.debug(`${this._logPrefix}Blockchain genesis: ${currency.genesis}`);

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    console.info(
      `${this._logPrefix}Last block: #${lastHeader.number} - hash ${lastHeader.hash}`
    );

    return {
      currency,
      api
    };
  }

  async filterAliveNodes(
    peers: string[],
    opts?: {
      timeout?: number;
    }
  ): Promise<Peer[]> {
    const result: Peer[] = [];
    await Promise.all(
      peers
        .map((peer) => Peers.fromUri(peer))
        .map((peer) =>
          this.isPeerAlive(peer).then((alive) => {
            if (!alive) return;
            result.push(peer);
          })
        )
    );
    return result;
  }

  async isPeerAlive(
    peer: Peer,
    opts?: {
      timeout?: number;
    }
  ): Promise<boolean> {
    // TODO
    return Promise.resolve(true);
  }

  selectRandomPeer(peers: Peer[]): Peer {
    const index = Math.floor(Math.random() * peers.length);
    return peers[index];
  }
}
