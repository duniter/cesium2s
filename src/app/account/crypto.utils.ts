import { AccountMeta } from '@app/account/account.model';
import { KeyringPair } from '@polkadot/keyring/types';
import { keyring } from '@polkadot/ui-keyring';
import { u8aToHex } from '@polkadot/util';
import { scryptEncode } from '@polkadot/util-crypto/scrypt/encode';
import { Params } from '@polkadot/util-crypto/scrypt/types';

export declare type ScryptParams = Params;

export const ED25519_SEED_LENGTH = 32;
export const SCRYPT_PARAMS = {
  SIMPLE: <ScryptParams>{
    N: 2048,
    r: 8,
    p: 1,
  },
  DEFAULT: <ScryptParams>{
    N: 4096,
    r: 16,
    p: 1,
  },
  SECURE: <ScryptParams>{
    N: 16384,
    r: 32,
    p: 2,
  },
  HARDEST: <ScryptParams>{
    N: 65536,
    r: 32,
    p: 4,
  },
  EXTREME: <ScryptParams>{
    N: 262144,
    r: 64,
    p: 8,
  },
};

export function getKeyringPairFromV1(data: { salt: string; password: string; meta?: AccountMeta; scryptParams?: ScryptParams }): KeyringPair {
  const ED25519_SEED_LENGTH = 32;
  const passwordU8a = Uint8Array.from(data.password.split('').map((x) => x.charCodeAt(0)));
  const saltU8a = Uint8Array.from(data.salt.split('').map((x) => x.charCodeAt(0)));
  const result = scryptEncode(passwordU8a, saltU8a, data.scryptParams || SCRYPT_PARAMS.DEFAULT);
  const seedHex = u8aToHex(result.password.slice(0, ED25519_SEED_LENGTH));
  return keyring.createFromUri(seedHex, data.meta || {}, 'ed25519');
}
