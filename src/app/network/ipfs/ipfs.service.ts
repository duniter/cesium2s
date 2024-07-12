import { Injectable } from '@angular/core';
import { Peer, Peers } from '@app/shared/services/network/peer.model';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import { SettingsService } from '@app/settings/settings.service';
import { arrayRandomPick, isNotNil } from '@app/shared/functions';
import { StorageService } from '@app/shared/services/storage/storage.service';
import { Observable } from 'rxjs';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { RxStartableService } from '@app/shared/services/rx-startable-service.class';

export interface IpfsState {
  peer: Peer;
  gatewayBaseUrl: string;
  offline: boolean;
}

@Injectable({ providedIn: 'root' })
export class IpfsService extends RxStartableService<IpfsState> {
  @RxStateSelect() peer$: Observable<Peer>;
  @RxStateProperty() peer: Peer;
  @RxStateProperty() gatewayBaseUrl: string;

  constructor(
    storage: StorageService,
    private settings: SettingsService
  ) {
    super(storage, {
      name: 'ipfs-service',
      startByReadyFunction: false, // Need an explicit call to start()
    });
  }

  getGatewayUrl(cid: string): string {
    return this.gatewayBaseUrl + cid;
  }

  /* -- protected functions -- */

  protected async ngOnStart(): Promise<IpfsState> {
    // Wait settings and storage
    const settings = await this.settings.ready();

    let peer = Peers.fromUri(settings.ipfsGateway);
    if (!peer) {
      const peers = await this.filterAlivePeers(settings.preferredIpfsGateways || []);
      if (!peers.length) {
        throw { message: 'ERROR.CHECK_NETWORK_CONNECTION' };
      }
      peer = arrayRandomPick(peers);
    }

    const gatewayBaseUrl = Peers.getHttpUri(peer) + '/ipfs/';

    return {
      peer,
      gatewayBaseUrl,
      offline: false,
    };
  }

  protected async filterAlivePeers(
    peers: string[],
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
    console.log(`${this._logPrefix}TODO: implement ${this.constructor.name}.isPeerAlive()`, peer);
    return Promise.resolve(true);
  }
}
