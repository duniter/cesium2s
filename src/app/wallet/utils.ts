import { AccountMeta } from '@app/wallet/account.model';
import { KeyringPair } from '@polkadot/keyring/types';
import { keyring } from '@polkadot/ui-keyring';
import { u8aToHex } from '@polkadot/util';
import { scryptEncode } from '@polkadot/util-crypto/scrypt/encode';
import { SCRYPT_PARAMS } from '@app/wallet/account.service';
import {ScryptParams} from "@polkadot/util-crypto/scrypt/types";

export function getKeyringPairFromV1(data: {
  salt: string;
  password: string;
  meta?: AccountMeta;
  scryptParams?: ScryptParams;
}): KeyringPair {
  const ED25519_SEED_LENGTH = 32;
  const passwordU8a = Uint8Array.from(
    data.password.split('').map((x) => x.charCodeAt(0))
  );
  const saltU8a = Uint8Array.from(
    data.salt.split('').map((x) => x.charCodeAt(0))
  );
  const result = scryptEncode(
    passwordU8a,
    saltU8a,
    data.scryptParams || SCRYPT_PARAMS.DEFAULT
  );
  const seedHex = u8aToHex(result.password.slice(0, ED25519_SEED_LENGTH));
  return keyring.createFromUri(seedHex, {}, 'ed25519');
}
