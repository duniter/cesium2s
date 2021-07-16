import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {AppBaseService} from "./base.service";
import {NodeService} from "./node.service";

@Injectable({providedIn: 'root'})
export class PlatformService extends AppBaseService {

  private _mobile: boolean = null;
  private _touchUi: boolean = null;


  get mobile(): boolean {
    return this._mobile != null ? this._mobile : this.platform.is('mobile');
  }

  get touchUi(): boolean {
    return this._touchUi != null ? this._touchUi :
      (this.mobile || this.platform.is('tablet') || this.platform.is('phablet'));
  }

  constructor(
    platform: Platform,
    private node: NodeService
  ) {
    super(platform, {
      name: 'platform-service'
    })
    this.start();
  }

  async doStart(): Promise<any> {

    this._mobile = this.mobile;
    this._touchUi = this.touchUi;

    await Promise.all([
        this.node.start()
      ]
    )
    // TODO: Init required service
  }
}
