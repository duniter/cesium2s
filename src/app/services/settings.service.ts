import {Injectable} from "@angular/core";
import {AppBaseService} from "./base.service";
import {Settings} from "../model/settings.model";
import {environment} from "../../environments/environment";
import {PlatformService} from "./platform.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class SettingsService extends AppBaseService {

  private _value$ = new BehaviorSubject<Settings>(null);

  get value$(): Observable<Settings> {
    return this._value$.asObservable();
  }

  constructor(
    protected platform: PlatformService
  ) {
    super(platform, {
      name: 'settings-service'
    })
  }

  protected async doStart(): Promise<any> {


    await this.restoreLocally();

  }

  async restoreLocally() {
    const data: Settings = {
      preferredPeers: [...environment.defaultPeers]
      // TODO
    };
    this._value$.next(data);
  }

  async saveLocally() {

  }
}
