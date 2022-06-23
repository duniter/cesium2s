import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {AppBaseService, IPlatform} from "./base.service";
import {PeerService} from "./peer.service";
import {SettingsService} from "./settings.service";

@Injectable({
  providedIn: 'root'
})
export class PlatformService extends AppBaseService implements IPlatform {

  private _mobile: boolean = null;
  private _touchUi: boolean = null;

  get mobile(): boolean {
    return this._mobile != null ? this._mobile : this.ionicPlatform.is('mobile');
  }

  get touchUi(): boolean {
    return this._touchUi != null ? this._touchUi :
      (this.mobile || this.ionicPlatform.is('tablet') || this.ionicPlatform.is('phablet'));
  }

  constructor(
    protected ionicPlatform: Platform,
    protected settings: SettingsService,
    protected node: PeerService
  ) {
    super(ionicPlatform, {
      name: 'platform-service'
    })
  }


  async doStart(): Promise<any> {

    this._mobile = this.mobile;
    this._touchUi = this.touchUi;

    await Promise.all([
        this.settings.start(true),
        this.node.start(true)
      ]
    )
    // TODO: Init required service
  }
}
