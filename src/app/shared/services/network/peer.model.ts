import { isNil, isNilOrNaN } from '@app/shared/functions';

export interface Peer {
  host: string;
  port: number;
  useSsl?: boolean;
  path?: string;
}

export abstract class Peers {
  static equals(peer1: Peer, peer2: Peer): boolean {
    return this.getWsUri(peer1) === this.getWsUri(peer2);
  }

  static fromUri(peerUri: string): Peer {
    if (!peerUri) return null;
    try {
      const url = new URL(peerUri);
      let port = parseInt(url.port);
      if (isNilOrNaN(port) && (url.protocol === 'https:' || url.protocol === 'wss:')) {
        port = 443;
      }
      return {
        host: url.hostname,
        port,
        path: url.pathname,
      };
    } catch (err) {
      throw new Error('Invalid URI: ' + peerUri);
    }
  }

  static getWsUri(peer: Peer) {
    if (!peer) return null;
    return `${peer.useSsl || peer.port === 443 ? 'wss' : 'ws'}://${peer.host}${isNil(peer.port) ? '' : ':' + peer.port}${peer.path || ''}`;
  }

  static getHttpUri(peer: Peer) {
    if (!peer) return null;
    return `${peer.useSsl || peer.port === 443 ? 'https' : 'http'}://${peer.host}${isNil(peer.port) ? '' : ':' + peer.port}${peer.path || ''}`;
  }

  static sameUri(uri1: string, uri2: string): boolean {
    return this.getWsUri(this.fromUri(uri1)) === this.getWsUri(this.fromUri(uri2));
  }
}
