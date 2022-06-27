import { Injectable } from '@angular/core';
import {ConfigureOptions, Storage} from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  configure(options: ConfigureOptions): Promise<void> {
    return Storage.configure(options);
  }

  async setString(key: string, value: string) {
    await Storage.set({ key, value });
  }

  async getString(key: string): Promise<{ value: any }> {
    return (await Storage.get({ key }));
  }

  async setObject(key: string, value: any) {
    await Storage.set({ key, value: JSON.stringify(value) });
  }

  async getObject(key: string): Promise<{ value: any }> {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async removeItem(key: string) {
    await Storage.remove({ key });
  }

  async keys(): Promise<string[]> {
    const {keys} = await Storage.keys();
    return keys;
  }

  async clear() {
    await Storage.clear();
  }
}
