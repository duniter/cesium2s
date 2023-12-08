import { KeyringJson, KeyringStore } from '@polkadot/ui-keyring/types';
import { Directive } from '@angular/core';
import { IStorage } from '@app/shared/services/storage/storage.utils';

// @dynamic
@Directive()
export class KeyringStorage implements KeyringStore {
  constructor(protected storage: IStorage, protected storagePrefix?: string) {
    this.storagePrefix = this.storagePrefix || 'keyring-';
  }

  get(key: string, cb: (value: KeyringJson) => void) {
    this.storage.get(this.storagePrefix + key).then((json) => cb(json as unknown as KeyringJson));
  }

  set(key: string, value: KeyringJson, cb?: () => void) {
    this.storage.set(this.storagePrefix + key, value).then(() => cb && cb());
  }

  remove(key: string, cb?: () => void) {
    this.storage.remove(this.storagePrefix + key).then(() => cb && cb());
  }

  all(cb: (key: string, value: KeyringJson) => void) {
    this.storage.forEach((value, key) => {
      //console.debug("Reading key=" + key, value);
      if (key.startsWith(this.storagePrefix)) {
        const shortKey = key.substring(this.storagePrefix.length);
        cb(shortKey, value as KeyringJson);
      }
    });
  }
}
