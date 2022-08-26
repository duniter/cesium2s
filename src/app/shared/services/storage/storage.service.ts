import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {StartableService} from "@app/shared/services/startable-service.class";
import {IStorage} from "@app/shared/services/storage/storage.interface";
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
    return this.storage.create();
  }

  async set(key: string, value: any) {
    if (!this.started) await this.ready();
    return this._data.set(key, value);
  }

  async get(key: string): Promise<any> {
    if (!this.started) await this.ready();
    return this._data.get(key);
  }

  async remove(key: string) {
    if (!this.started) await this.ready();
    return this._data.remove(key);
  }

  async keys(): Promise<string[]> {
    if (!this.started) await this.ready();
    return this._data.keys();
  }

  async clear() {
    if (!this.started) await this.ready();
    await this._data.clear();
  }

  async forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any): Promise<void> {
    if (!this.started) await this.ready();
    return this._data.forEach(iteratorCallback);
  }
}
