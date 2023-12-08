import { Capacitor } from '@capacitor/core';

export declare type CapacitorPluginType = 'Camera' | 'StatusBar' | 'Keyboard' | 'BarcodeScanner';

export class CapacitorPlugins {
  static readonly Camera = 'Camera';
  static readonly StatusBar = 'StatusBar';
  static readonly Keyboard = 'Keyboard';
  static readonly BarcodeScanner = 'BarcodeScanner';

  private static _cache = {};

  static isAvailable(name: CapacitorPluginType): boolean {
    if (this._cache[name] === undefined) {
      this._cache[name] = Capacitor.isPluginAvailable(name);
    }
    return this._cache[name];
  }
}
