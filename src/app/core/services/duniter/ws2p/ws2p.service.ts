import {ErrorCodes} from "../../errors";
import {Injectable} from "@angular/core";
import {NetworkService} from "../../network/network.service";
import {CryptoService} from "../../crypto.service";
import {AccountHolder} from "../../account.service";

@Injectable({providedIn: 'root'})
export class Ws2pService /*implements IPeerApiService */ {

    private readonly _debug: boolean;

    constructor(
        protected network: NetworkService,
        protected cryptoService: CryptoService
    ) {
        this._debug = true; //TODO !environment.production;
    }

    // TODO: rewrite this code
    async authenticateAndGetToken(account: AccountHolder, token?: string, counter?: number): Promise<string> {
        if (!account.pubkey) throw new Error("User not logged");

        if (this._debug && !counter) console.debug("[account] Authenticating on server...");

        if (counter > 4) {
            if (this._debug) console.debug(`[account] Authentication failed (after ${counter} attempts)`);
            throw {code: ErrorCodes.AUTH_SERVER_ERROR, message: "ERROR.AUTH_SERVER_ERROR"};
        }

        // Check if valid
        if (token) {
            const data = undefined;
            /*await this.graphql.query<{ authenticate: boolean }, { token: string }>({
                query: AuthQuery,
                variables: {
                    token: token
                },
                error: {
                    code: ErrorCodes.UNAUTHORIZED,
                    message: "ERROR.UNAUTHORIZED"
                },
                fetchPolicy: 'network-only'
            });*/

            // Token is accepted by the server: store it
            if (data && data.authenticate) {
                //this.onAuthTokenChange.next(token);
                return token; // return the token
            }

            // Continue (will retry with another challenge)
        }

        // Generate a new token
        const challengeError = {
            code: ErrorCodes.AUTH_CHALLENGE_ERROR,
            message: "ERROR.AUTH_CHALLENGE_ERROR"
        };
        const data = null; /*await this.graphql.query<{
            authChallenge: {
                pubkey: string,
                challenge: string,
                signature: string
            }
        }>({
            query: AuthChallengeQuery,
            variables: {},
            error: challengeError,
            fetchPolicy: 'network-only'
        });*/

        // Check challenge
        if (!data || !data.authChallenge) throw challengeError; // Should never occur

        // TODO: check server signature
        const signatureOK = await this.cryptoService.verify(
            data.authChallenge.challenge,
            data.authChallenge.signature,
            data.authChallenge.pubkey
        );
        if (!signatureOK) {
            console.warn("FIXME: Bad server signature on auth challenge !", data.authChallenge);
        }
        // TODO: check server pubkey as a valid certificate

        // Do the challenge
        const signature = await this.cryptoService.sign(data.authChallenge.challenge, account.keypair);
        const newToken = `${account.pubkey}:${data.authChallenge.challenge}|${signature}`;

        // iterate with the new token
        return await this.authenticateAndGetToken(account, newToken, (counter || 1) + 1 /* increment */);
    }
}
