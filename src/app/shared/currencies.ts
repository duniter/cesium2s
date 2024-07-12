import { isNil, isNilOrBlank } from '@app/shared/functions';
import { Currency } from '@app/currency/currency.model';
import { keyring } from '@polkadot/ui-keyring';
import * as Base58 from 'bs58';
import { sha256AsU8a } from '@polkadot/util-crypto';

export function abbreviate(currency: string): string {
  if (isNilOrBlank(currency)) return '';

  if (currency.length > 3) {
    const sepChars = ['-', '_', ' '];
    let unit = '';
    for (let i = 0; i < currency.length; i++) {
      const c = currency[i];
      if (i === 0) {
        unit = c === 'g' || c === 'G' ? 'Ğ' : c;
      } else if (i > 0 && sepChars.indexOf(currency[i - 1]) != -1) {
        unit += c;
      }
    }
    return unit.toUpperCase();
  }

  // Less than 3 characters
  currency = currency.toUpperCase();
  if (currency.charAt(0) === 'G') {
    currency = 'Ğ' + (currency.length > 1 ? currency.substring(1) : '');
  }

  return currency;
}

export function formatAddress(value: string): string {
  if (!value) return '';
  if (value.length < 12) return '?';
  return value.substring(0, 6) + '\u2026' + value.substring(value.length - 6);
}

export function formatPubkey(pubkey: string, withChecksum?: boolean): string {
  if (!pubkey) return '';
  if (pubkey.length < 43) return '?';
  let shortPubkey = pubkey.substring(0, 4) + '\u2026' + pubkey.substring(pubkey.length - 4);

  if (withChecksum) {
    shortPubkey += ':' + pubkeyV1Checksum(pubkey);
  }

  return shortPubkey;
}

export function address2PubkeyV1(address: string, ss58Format?: number, withChecksum?: boolean) {
  //ss58Format = ss58Format || WELL_KNOWN_CURRENCIES.GDEV.ss58Format;

  let pubkey = '';

  try {
    const potentialPubKey = keyring.decodeAddress(address, isNil(ss58Format), ss58Format);
    pubkey = Base58.encode(potentialPubKey);
  } catch (err) {
    console.error('Invalid Address', err);
    return undefined;
  }

  if (withChecksum) {
    pubkey += ':' + pubkeyV1Checksum(pubkey);
  }

  return pubkey;
}

export function pubkeyV1Checksum(pubkey: string) {
  // Remove leading '1' (see https://forum.duniter.org/t/format-de-checksum/7616)
  const pubkeyIntArray = pubkey && pubkey.length === 44 && pubkey.charAt(0) === '1' ? Base58.decode(pubkey.substring(1)) : Base58.decode(pubkey);
  return Base58.encode(sha256AsU8a(sha256AsU8a(pubkeyIntArray))).substring(0, 3);
}

export const WELL_KNOWN_CURRENCIES = Object.freeze({
  GDEV: <Partial<Currency>>{
    network: 'gdev',
    displayName: 'ĞDev',
    symbol: 'GD',
    ss58Format: 42,
    genesis: '0xa565a0ccbab8e5f29f0c8a901a3a062d17360a4d4f5319d03a1580fba4cbf3f6',
    startTime: '2023-11-29T21:39:00.00Z', // TODO
    fees: {
      identity: 300, // = 3 Gdev
      tx: 2, // = 0.02 Gdev
      cert: 2, // = 0.02 Gdev
    },
    decimals: 2,
  },
  G1: <Partial<Currency>>{
    network: 'g1',
    displayName: 'Ğ1',
    symbol: 'G1',
    ss58Format: 4450,
    genesis: '0x___TODO___',
    startTime: '2017-03-08T00:00:00.00Z', // TODO
    fees: {
      identity: 300, // = 3G1 - FIXME
      tx: 1, // = 0.01 G1 - FIXME
      cert: 1, // = 0.01 G1 - FIXME
    },
    decimals: 2, // FIXME remove for autodetection
  },
});
