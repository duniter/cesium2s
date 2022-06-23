export interface Peer {
  host: string;
  port: number;
  useSsl?: boolean;
  path?: string;
}

export interface Settings {

  preferredPeers: Peer[];

  // TODO
  [key: string]: any;
}

