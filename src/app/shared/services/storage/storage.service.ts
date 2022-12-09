import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {StartableService} from "@app/shared/services/startable-service.class";
import {IStorage} from "@app/shared/services/storage/storage.utils";
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends StartableService implements IStorage {

  private _storage: Storage;

  get driver(): string | undefined {
    return this._storage?.driver;
  }

  constructor(private platform: Platform,
              private storage: Storage) {
    super(platform);
    this.start();
  }

  protected async ngOnStart(): Promise<{}> {
    await this.platform.ready();
    this._storage = await this.storage.create();
    //console.info(`[storage-service] Started using driver=${this.driver}`);
    return {};
  }

  async set(key: string, value: any) {
    //if (this._debug) console.debug(`[storage-service] Set ${key} = `, value);

    if (!this.started) await this.ready();
    return this._storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    //if (this._debug) console.debug(`[storage-service] Get ${key}`);
    if (!this.started) await this.ready();
    return this._storage.get(key);
  }

  async remove(key: string) {
    if (!this.started) await this.ready();
    //if (this._debug) console.debug(`[storage-service] Remove key ${key}`);
    return this._storage.remove(key);
  }

  async keys(): Promise<string[]> {
    //if (this._debug) console.debug(`[storage-service] Get keys`);
    if (!this.started) await this.ready();
    const keys = await this._storage.keys();
    //if (this._debug) console.debug(`[storage-service] ${keys.length} keys found: `, keys);
    return keys;
  }

  async clear() {
    if (!this.started) await this.ready();
    await this._storage.clear();
  }

  async forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any): Promise<void> {
    if (!this.started) await this.ready();
    return this._storage.forEach(iteratorCallback);
  }
}
