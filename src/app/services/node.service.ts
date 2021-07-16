import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {AppBaseService} from "./base.service";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {web3Accounts, web3Enable, web3FromAddress} from "@polkadot/extension-dapp";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class NodeService extends AppBaseService {

  private _api: ApiPromise;

  get api(): ApiPromise {
    return this._api
  }

  constructor(
    platform: Platform
  ) {
    super(platform, {
      name: 'node-service'
    });
  }

  protected async doStart(): Promise<any> {
    // Construct
    const wsProvider = new WsProvider('ws://localhost:9944');
    const api = await ApiPromise.create({ provider: wsProvider });

    // Do something
    this.info("Connected to Blockchain genesis: " + api.genesisHash.toHex());

    this._api = api;
  }
}
