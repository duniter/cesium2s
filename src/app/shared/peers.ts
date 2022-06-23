import {Peer} from "../model/settings.model";

export class PeerUtils {

  static getWsUri(peer: Peer) {
    return `${peer.useSsl || peer.port === 443 ? 'wss' : 'ws'}://${peer.host}:${peer.port||80}${peer.path}`
  }
}
