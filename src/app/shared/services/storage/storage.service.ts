import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {IStorage} from "@app/shared/services/storage/storage.utils";
import {Platform} from '@ionic/angular';
import {StartableService} from "@app/shared/services/startable-service.class";

@Injectable({
  providedIn: 'root'
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class StorageService<T = any> extends StartableService<Storage> implements IStorage<T> {

  get driver(): string | undefined {
    return this.storage?.driver;
  }

  constructor(private platform: Platform,
              private storage: Storage) {
    super(platform);
    this.start();
  }

  protected async ngOnStart() {
    await this.platform.ready();
    const storage = await this.storage.create();
    console.info(`[storage-service] Started using driver=${this.driver}`);
    return storage;
  }

  async set(key: string, value: T) {
    //if (this._debug) console.debug(`[storage-service] Set ${key} = `, value);

    if (!this.started) await this.ready();
    return this.storage.set(key, value);
  }

  async get(key: string): Promise<T> {
    //if (this._debug) console.debug(`[storage-service] Get ${key}`);
    if (!this.started) await this.ready();
    return this.storage.get(key);
  }

  async remove(key: string) {
    if (!this.started) await this.ready();
    //if (this._debug) console.debug(`[storage-service] Remove key ${key}`);
    return this.storage.remove(key);
  }

  async keys(): Promise<string[]> {
    //if (this._debug) console.debug(`[storage-service] Get keys`);
    if (!this.started) await this.ready();
    return await this.storage.keys();
  }

  async clear() {
    if (!this.started) await this.ready();
    await this.storage.clear();
  }

  async forEach(iteratorCallback: (value: T, key: string, iterationNumber: Number) => T): Promise<void> {
    if (!this.started) await this.ready();
    return this.storage.forEach(iteratorCallback);
  }
}
