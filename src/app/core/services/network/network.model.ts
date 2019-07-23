import {isNilOrBlank, isNotNil} from "../../../shared/functions";
import {Entity} from "../model";

export declare type PeerEndpointApi = 'BMA' | 'GVA' | 'WS2P';

export class Peer extends Entity<Peer, string> {

    static fromObject(source: any): Peer {
        if (!source || source instanceof Peer) return source;
        const res = new Peer();
        res.fromObject(source);
        return res;
    }

    static parseUrl(peerUrl: string) {
        const url = new URL(peerUrl);
        return Peer.fromObject({
            dns: url.hostname,
            port: isNilOrBlank(url.port) ? undefined : url.port,
            useSsl: url.protocol && (url.protocol.startsWith('https') || url.protocol.startsWith('wss'))
        });
    }

    dns: string;
    ipv4: string;
    ipv6: string;
    port: number;
    useSsl: boolean;
    pubkey: string;

    avatar: string;
    status: 'UP' | 'DOWN';
    softwareName: string;
    softwareVersion: string;
    label: string;
    name: string;
    // TODO
    endpointApis: PeerEndpointApi[] = [];

    constructor() {
        super();
    }

    get id(): string {
        return `${this.pubkey}-${this.hostAndPort}`;
    }

    clone(): Peer {
        return Peer.fromObject(this.asObject());
    }

    fromObject(source: any): Entity<Peer> {
        super.fromObject(source);
        this.dns = source.dns || source.host;
        this.ipv4 = source.ipv4;
        this.ipv6 = source.ipv6;
        this.port = isNotNil(source.port) ? +source.port : undefined;
        this.pubkey = source.pubkey;
        this.useSsl = source.useSsl || (this.port === 443);
        return this;
    }

    get url(): string {
        return (this.useSsl ? 'https://' : 'http://') + this.hostAndPort;
    }

    get hostAndPort(): string {
        return (this.dns || this.ipv4 || this.ipv6) +
            ((this.port && this.port !== 80 && this.port !== 443) ? ':' + this.port : '');
    }

    get reachable(): boolean {
        return this.status && this.status === 'UP';
    }

    hasEndpoint(api: PeerEndpointApi) {
        return this.endpointApis && this.endpointApis.findIndex(apApi => apApi === api) !== -1;
    }
}
