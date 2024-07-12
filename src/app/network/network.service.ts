import { inject, Injectable } from '@angular/core';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { SettingsService } from '../settings/settings.service';
import { Peer, Peers } from '@app/shared/services/network/peer.model';
import { abbreviate, WELL_KNOWN_CURRENCIES } from '@app/shared/currencies';
import { Currency } from '../currency/currency.model';
import { RxStartableService } from '@app/shared/services/rx-startable-service.class';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { mergeMap, Observable, tap } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { arrayRandomPick, isNotNil, isNotNilOrBlank, toNumber } from '@app/shared/functions';
import { IndexerService } from './indexer/indexer.service';
import { fromDateISOString } from '@app/shared/dates';
import { ContextService } from '@app/shared/services/storage/context.service';
import { PodService } from '@app/network/pod/pod.service';

export interface NetworkState {
  peer: Peer;
  currency: Currency;
  currencySymbol: string;
  currentUd?: number;
  api: ApiPromise;
}

@Injectable({ providedIn: 'root' })
export class NetworkService extends RxStartableService<NetworkState> {
  indexer = inject(IndexerService);
  pod = inject(PodService);

  @RxStateProperty() peer: Peer;
  @RxStateProperty() currency: Currency;
  @RxStateProperty() currencySymbol: string;
  @RxStateProperty() currentUd: number;
  @RxStateProperty() api: ApiPromise;

  @RxStateSelect() peer$: Observable<Peer>;
  @RxStateSelect() currency$: Observable<Currency>;
  @RxStateSelect() currentUd$: Observable<number>;

  constructor(
    private settings: SettingsService,
    private context: ContextService
  ) {
    super(settings, {
      name: 'network-service',
    });

    this.connect('currencySymbol', this.currency$.pipe(map((currency) => currency?.symbol)));

    // Restart when settings peer changed
    this.hold(
      this.settings.peer$.pipe(
        filter((peer) => isNotNilOrBlank(peer) && this.started),
        map(Peers.fromUri),
        filter((peer) => !Peers.equals(this.peer, peer))
      ),
      () => this.restart()
    );

    this.hold(this.currency$, (currency) => (this.context.currency = currency));

    this.connect(
      'currentUd',
      this.select('currency').pipe(
        mergeMap(async (currency) => {
          const ud = await this.api.query.universalDividend.currentUd();
          return toNumber(ud) / currency.powBase;
        }),
        tap((currentUd) => console.info(`${this._logPrefix}Current UD: ${currentUd}`))
      )
    );
  }

  protected async ngOnStart(): Promise<NetworkState> {
    const settings = await this.settings.ready();

    let peer = Peers.fromUri(settings.peer);
    if (!peer) {
      const peers = await this.filterAlivePeers(settings.preferredPeers);
      if (!peers.length) {
        throw { message: 'ERROR.CHECK_NETWORK_CONNECTION' };
      }
      peer = arrayRandomPick(peers);
    }

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
    const [chain, nodeName, nodeVersion, properties] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
      api.rpc.system.properties(),
    ]);
    //const chainObj = await api.rpc.system.chain();
    //const chainPrefix = '' + chain.toHuman().split(' ')?.[0];
    const genesis = api.genesisHash.toHex();

    console.info(`${this._logPrefix}Node {${nodeName}} v${nodeVersion}`);
    console.info(`${this._logPrefix}Connecting to chain {${chain}}: ` + JSON.stringify(properties.toHuman()));

    let currency: Currency;
    // Check is well known currency
    const wellKnownCurrency = Object.values(WELL_KNOWN_CURRENCIES).find((c) => c.displayName === chain.toHuman());
    if (wellKnownCurrency) {
      if (wellKnownCurrency.genesis && wellKnownCurrency.genesis !== genesis) {
        console.warn(`${this._logPrefix}Invalid genesis for ${chain}! Expected ${wellKnownCurrency.genesis} but peer return ${genesis}`);
      }
      currency = <Currency>{ ...wellKnownCurrency };
    } else {
      console.warn(`${this._logPrefix}Not a well known currency: ${chain}!`);
    }
    currency = currency || <Currency>{};
    currency.displayName = currency?.displayName || chain.toHuman();
    currency.symbol = currency?.symbol || properties.tokenSymbol.value?.[0].toHuman() || abbreviate(this.currency.displayName);
    currency.decimals = currency?.decimals || +properties.tokenDecimals.value?.[0].toHuman() || 0;
    currency.powBase = Math.pow(10, currency.decimals);
    currency.ss58Format = currency.ss58Format || WELL_KNOWN_CURRENCIES.GDEV.ss58Format; // TODO use G1 defaults
    currency.genesis = genesis;
    currency.startTime = fromDateISOString(currency.startTime);
    currency.fees = {
      ...WELL_KNOWN_CURRENCIES.GDEV.fees, // TODO use G1 defaults
      ...(currency.fees || {}),
    };

    // Read the genesys block hash
    console.debug(`${this._logPrefix}Chain genesis: ${currency.genesis}`);

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    console.info(`${this._logPrefix}Last block: #${lastHeader.number} - hash ${lastHeader.hash}`);

    const ud0 = toNumber(api.consts.universalDividend.unitsPerUd) / currency.powBase;

    // Configure and start indexer and pod
    this.indexer.currency = currency;
    this.pod.currency = currency;
    await Promise.all([this.indexer.start(), this.pod.start()]);

    return {
      api,
      peer,
      currency,
      currencySymbol: currency?.symbol,
      currentUd: ud0,
    };
  }

  protected async ngOnStop(): Promise<void> {
    await this.indexer.stop();

    return super.ngOnStop();
  }

  protected async filterAlivePeers(
    peers: string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    opts?: {
      timeout?: number;
    }
  ): Promise<Peer[]> {
    return (
      await Promise.all(
        peers.map((peer) => Peers.fromUri(peer)).map((peer) => this.isPeerAlive(peer, opts).then((alive) => (alive ? peer : undefined)))
      )
    ).filter(isNotNil);
  }

  protected async isPeerAlive(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    peer: Peer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    opts?: {
      timeout?: number;
    }
  ): Promise<boolean> {
    // TODO
    return Promise.resolve(true);
  }
}
