import {PendingIdentity, Source} from "../duniter.model";
import {Entity} from "../../model";

export const BmaConstants = {
    LIMIT_REQUEST_COUNT: 5, // simultaneous async request to a Duniter node
    LIMIT_REQUEST_DELAY: 1000, // time (in second) to wait between to call of a rest request
};

export class BmaSource extends Entity<BmaSource, string> implements Source {

    static fromObject(json: any): BmaSource {
        if (!json) return undefined;
        const target = new BmaSource();
        target.fromObject(json);
        return target;
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

    clone(): BmaSource {
        return BmaSource.fromObject(this.asObject());
    }

}

export class BmaPendingIdentity extends Entity<BmaPendingIdentity, string> implements PendingIdentity {

    static fromObject(json: any): BmaPendingIdentity {
        if (!json) return undefined;
        const target = new BmaPendingIdentity();
        target.fromObject(json);
        return target;
    }

    pubkey: string;
    uid: string;
    membership: boolean;

    revoked: boolean;
    buid: string;
    member: boolean;
    kick?: boolean;
    leaving?: boolean;
    wasMember?: boolean;
    sig: string;
    revocation_sig?: string;
    hash: string;
    written?: boolean;
    revoked_on?: number;
    expires_on: number;

    get id(): string {
        return `${this.uid}-${this.pubkey}-${this.hash}`;
    }

    clone(): BmaPendingIdentity {
        return BmaPendingIdentity.fromObject(this.asObject());
    }
}


export class BmaMembership extends Entity<BmaMembership, string> {

    static fromObject(json: any): BmaMembership {
        if (!json) return undefined;
        const target = new BmaMembership();
        target.fromObject(json);
        return target;
    }

    pubkey: string;
    uid: string;
    currency: string;
    version: number;
    membership: 'IN'|'OUT';
    blockNumber: number;
    blockHash: string;
    written: boolean | null;

    get id(): string {
        return `${this.uid}-${this.pubkey}-${this.blockNumber}-${this.blockHash}`;
    }

    clone(): BmaMembership {
        return BmaMembership.fromObject(this.asObject());
    }
}

export class BmaLookupkupResult extends Entity<BmaLookupkupResult, string> {

    static fromObject(json: any): BmaLookupkupResult {
        if (!json) return undefined;
        const target = new BmaLookupkupResult();
        return target.fromObject(json);
    }

    pubkey: string;
    uids: BmaLookupkupUid[];

    get id(): string {
        return this.pubkey;
    }

    clone(): BmaLookupkupResult {
        return BmaLookupkupResult.fromObject(this.asObject());
    }

    fromObject(source: any): BmaLookupkupResult {
        super.fromObject(source);
        this.uids = source.uids && source.uids.map(BmaLookupkupUid.fromObject);
        return this;
    }
}

export class BmaLookupkupUid extends Entity<BmaLookupkupResult, string> {

    static fromObject(json: any): BmaLookupkupResult {
        if (!json) return undefined;
        const target = new BmaLookupkupResult();
        return target.fromObject(json);
    }

    uid: string;
    revoked: boolean;
    revoked_on?: number;
    revocation_sig?: string;
    self: string;
    //others: string;

    get id(): string {
        return this.uid;
    }

    clone(): BmaLookupkupResult {
        return BmaLookupkupResult.fromObject(this.asObject());
    }
}
