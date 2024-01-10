import { ConnectionStatus, Network } from '@capacitor/network';

export declare type NetworkEventType = 'start' | 'peerChanged' | 'statusChanged' | 'resetCache' | 'beforeTryOnlineFinish';

export declare type ConnectionType = 'wifi' | 'cellular' | 'none' | 'unknown';

export class NetworkUtils {
  static addStatusChangeListener(callback: (status: ConnectionStatus) => never) {
    return Network.addListener('networkStatusChange', callback);
  }

  static getStatus() {
    return Network.getStatus();
  }
}
