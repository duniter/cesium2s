import {isNil, isNotNil, isNotNilOrBlank} from "@app/shared/functions";

export interface Peer {
  host: string;
  port: number;
  useSsl?: boolean;
  path?: string;
}

export abstract class Peers {

  static fromUri(peerUri: string): Peer {
    try {
      const url = new URL(peerUri);
      let port = undefined;
      if (isNil(port) && (url.protocol === 'https:' || url.protocol === 'wss:')) {
        port = 443;
      }
      return {
        host: url.host,
        port,
        path: url.pathname
      };
    } catch(err) {
      throw new Error('Invalid URI: ' + peerUri);
    }
  }

  static getWsUri(peer: Peer) {
    return `${peer.useSsl || peer.port === 443 ? 'wss' : 'ws'}://${peer.host}${isNil(peer.port) ? '' : ':' + peer.port}${peer.path||'/ws'}`
  }
}