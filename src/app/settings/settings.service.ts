import {Injectable} from "@angular/core";
import {Settings} from "./settings.model";
import {environment} from "@environments/environment";
import {StartableService} from "@app/shared/services/startable-service.class";
import {Platform} from "@ionic/angular";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class SettingsService extends StartableService<Settings> {

  private _mobile: boolean;

  changes = new Subject<Settings>();

  get mobile() {
    return this._mobile;
  }

  constructor(
    protected ionicPlatform: Platform
  ) {
    super(ionicPlatform, {
      name: 'settings-service'
    })
  }

  protected async ngOnStart(): Promise<Settings> {

    this._mobile = this.ionicPlatform.is('mobile');

    const data = await this.restoreLocally();

    return data;
  }

  clone(): Settings {
    return <Settings>{
      locale: environment.defaultLocale,
      peer: environment.defaultPeers && environment.defaultPeers[0],
      defaultPeers: environment.defaultPeers || [],
      ...this._data
    }
  }

  async restoreLocally(): Promise<Settings> {
    const data = <Settings>{
      preferredPeers: !environment.production && environment.dev?.peer
        ? [environment.dev.peer]
        : [...environment.defaultPeers]
    };
    return data;
  }

  patchValue(data: Partial<Settings>) {
    if (!data) return;
    this._data = {
      ...this._data,
      ...data
    };
    this.changes.next(this._data);
  }

  async saveLocally() {
    // TODO
  }
}
