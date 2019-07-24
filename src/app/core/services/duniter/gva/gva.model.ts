import {PendingIdentity, Source} from "../duniter.model";
import {Entity} from "../../model";

export class GvaSource extends Entity<GvaSource, string> implements Source {

    static fromObject(json: any): GvaSource {
        if (!json) return undefined;
        const target = new GvaSource();
        return target.fromObject(json) as GvaSource;
    }

    type: String;
    noffset: number;
    identifier: string;
    amount: number;
    base: number;
    conditions: string;
    consumed: boolean;

    get id(): string {
        return `${this.type}-${this.identifier}-${this.noffset}`;
    }

    clone(): GvaSource {
        return GvaSource.fromObject(this.asObject());
    }

}

export class GvaPendingIdentity extends Entity<GvaPendingIdentity, string> implements PendingIdentity {

    static fromObject(json: any): GvaPendingIdentity {
        if (!json) return undefined;
        const target = new GvaPendingIdentity();
        target.fromObject(json);
        return target;
    }

    revoked: boolean;
    buid: string;
    member: boolean;
    kick?: boolean;
    leaving?: boolean;
    wasMember?: boolean;
    pubkey: string;
    uid: string;
    sig: string;
    revocation_sig?: string;
    hash: string;
    written?: boolean;
    revoked_on?: number;
    expires_on: number;

    get id(): string {
        return `${this.uid}-${this.pubkey}-${this.hash}`;
    }

    clone(): GvaPendingIdentity {
        return GvaPendingIdentity.fromObject(this.asObject());
    }
}
