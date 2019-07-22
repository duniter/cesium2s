import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Peer} from "../services/model";
import {Observable, of, Subject, Subscription} from "rxjs";
import {fadeInAnimation} from "../../shared/material/material.animations";
import {HttpClient} from "@angular/common/http";
import {catchError, timeout} from "rxjs/operators";

@Component({
  selector: 'select-peer-modal',
  templateUrl: 'select-peer.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class SelectPeerModal implements OnDestroy{

  private _subscriptions: Subscription[];

  loading = true;
  $peers = new Subject<Peer[]>();

  @Input() canCancel = true;
  @Input() allowSelectDownPeer = true;


  set peers(peers: Observable<Peer[]>) {
    if (this._subscriptions) this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [peers.subscribe(res => this.refreshPeers(res))];
  }


  constructor(
    private http: HttpClient,
    private viewCtrl: ModalController,
    private cd: ChangeDetectorRef
  ) {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ngOnDestroy(): void {
    if (this._subscriptions) this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];
  }

  selectPeer(item: Peer) {
    if (this.allowSelectDownPeer || item.reachable) {
      console.debug("[select-peer-modal] User select the peer:", item);
      this.viewCtrl.dismiss(item);
    }
  }

  async refreshPeers(peers: Peer[]) {
    peers = peers || [];

    console.debug("[select-peer-modal] Refreshing peers status...");

    const data: Peer[] = [];
    const jobs = Promise.all(
      peers.map(async (peer) => {
        await this.refreshPeer(peer);
        data.push(peer);

        // Sort (by reachable, then host)
        data.sort((a, b) => {
          if (a.reachable && !b.reachable) return -1;
          if (!a.reachable && b.reachable) return 1;
          if (a.hostAndPort < b.hostAndPort) return -1;
          if (a.hostAndPort > b.hostAndPort) return 1;
          return 0;
        });

        this.$peers.next(data);
        return peer;
      }));

    this._subscriptions.push(this.$peers
      // .pipe(
      //   debounceTime(500)
      // )
      .subscribe(() => {
        this.cd.markForCheck();
      }));

    try {
      await jobs;
    }
    catch(err) {
      console.error(err);
    }
    this.loading = false;
    this.cd.markForCheck();
  }

  protected async refreshPeer(peer: Peer): Promise<Peer> {
    const uri = peer.url + '/api/node/info';
    try {
      const summary: any = await this.http.get(uri)
          .pipe(timeout(2000)).toPromise();
      peer.status = 'UP';
      peer.softwareName = summary.softwareName;
      peer.softwareVersion = summary.softwareVersion;
      peer.label = summary.nodeLabel;
      peer.name = summary.nodeName;
    } catch (err) {
      console.error(`[select-peer] Could not access to {${uri}}: ${err && err.statusText}`);
      peer.status = 'DOWN';
    }
    return peer;
  }
}
