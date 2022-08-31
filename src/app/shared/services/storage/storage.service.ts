import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {StartableService} from "@app/shared/services/startable-service.class";
import {IStorage} from "@app/shared/services/storage/storage.utils";
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends StartableService<Storage>
  implements IStorage<Storage> {

  get driver(): string | undefined {
    return this._data?.driver;
  }

  constructor(private platform: Platform,
              private storage: Storage) {
    super(platform);
    this.start();
  }

  protected async ngOnStart(): Promise<Storage> {
    await this.platform.ready();
    const storage = await this.storage.create();
    console.info(`[storage-service] Started using driver=${storage?.driver}`);
    return storage;
  }

  async set(key: string, value: any) {
    console.debug(`[storage-service] Set ${key} = `, value);

    if (!this.started) await this.ready();
    return this._data.set(key, value);
  }

  async get(key: string): Promise<any> {
    console.debug(`[storage-service] Get ${key} ...`);
    if (!this.started) await this.ready();
    return this._data.get(key);
  }

  async remove(key: string) {
    if (!this.started) await this.ready();
    return this._data.remove(key);
  }

  async keys(): Promise<string[]> {
    console.debug(`[storage-service] Get keys...`);
    if (!this.started) await this.ready();
    const keys = await this._data.keys();
    console.debug(`[storage-service] ${keys.length} keys found: `, keys);
    return keys;
  }

  async clear() {
    if (!this.started) await this.ready();
    await this._data.clear();
  }

  async forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any): Promise<void> {
    if (!this.started) await this.ready();
    return this._data.forEach((value, key, iterationNumber) => {
      iteratorCallback(value, key, iterationNumber);
    });
  }
}
