export const PUBKEY_REGEXP = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}$/;
export const UID_REGEXP = /^[0-9a-zA-Z-_]{3,42}$/;
export const ADDRESS_REGEXP = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}$/;

export const DATE_ISO_PATTERN = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const DATE_PATTERN = 'YYYY-MM-DD';
export const DATE_MATCH_REGEXP = new RegExp(/^\d+[-]\d+[-]\d+$/g);
export const DEFAULT_PLACEHOLDER_CHAR = '\u005F';
export const SPACE_PLACEHOLDER_CHAR = '\u2000';

export const INTEGER_REGEXP = /^[-]?\d+$/;
export const NUMBER_REGEXP = /^[-]?\d+(\.\d+)?$/;
export const NUMBER_RANGE_REGEXP = /^(\d+-\d+)|([><=]*\d+)$/;
