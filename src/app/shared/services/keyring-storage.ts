import {KeyringJson, KeyringStore} from "@polkadot/ui-keyring/types";
import {StorageService} from "@app/shared/services/storage.service";

export class KeyringStorage implements KeyringStore {
  constructor(
    protected storage: StorageService,
    protected storagePrefix?: string
  ) {
    this.storagePrefix = this.storagePrefix || 'keyring-';
  }

  get(key: string, cb) {
    this.storage.getObject(this.storagePrefix + key)
      .then(json => cb(json as unknown as KeyringJson));
  }

  set(key: string, value: KeyringJson, cb) {
    this.storage.setObject(this.storagePrefix + key, value).then(cb);
  }

  remove(key, cb) {
    this.storage.removeItem(this.storagePrefix + key).then(cb);
  }

  async all(cb) {
    const keys = await this.storage.keys();
    for (let key of keys) {
      if (key.startsWith(this.storagePrefix)) {
        const json = await this.storage.getObject(key);
        const shortKey = key.substring(this.storagePrefix.length);
        cb(shortKey, json as unknown as KeyringJson);
      }
    }
  }
}
