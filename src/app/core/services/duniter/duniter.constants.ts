import {exact, match} from "../../../shared/shared.module";

// Avoid to many call on well known currencies
export const WellKnownCurrencies = [
  {
    currency: 'g1',
    firstBlockTime: 1488987127,
    medianTimeOffset: 3600,
    symbol: 'Ğ1'
  },
  {
    currency: 'g1-test',
    firstBlockTime: 1496842431,
    medianTimeOffset: 1800,
    symbol: 'ĞT'
  }
];

export const DuniterEndpointApis = {
  BMA: 'BASIC_MERKLED_API',
  BMAS: 'BMAS',
  WS2P: 'WS2P',
  BMATOR: 'BMATOR',
  WS2PTOR: 'WS2PTOR',
  GVA: 'GVA'
};

// Regexp string
const USER_ID = "[0-9a-zA-Z-_]+";
const PUBKEY = "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}";
const CURRENCY = "[0-9a-zA-Z-_]+";
const ENDPOINT_PARAMS = "( ([a-z_][a-z0-9-_.ğĞ]*))?( ([0-9.]+))?( ([0-9a-f:]+))?( ([0-9]+))( (.+))?";
const SIGNATURE = "[0-9a-zA-Z]{43,44}";

// TX output conditions
const TX_OUTPUT_SIG = "SIG\\((" + SIGNATURE + ")\\)";
const TX_OUTPUT_XHX = 'XHX\\(([A-F0-9]{1,64})\\)';
const TX_OUTPUT_CSV = 'CSV\\(([0-9]{1,8})\\)';
const TX_OUTPUT_CLTV = 'CLTV\\(([0-9]{1,10})\\)';
const TX_OUTPUT_FUNCTION = TX_OUTPUT_SIG + '|' + TX_OUTPUT_XHX + '|' + TX_OUTPUT_CSV + '|' + TX_OUTPUT_CLTV;
const TX_OUTPUT_OPERATOR = '(&&)|(\\|\\|)';
const TX_OUTPUT_OBJ = 'OBJ\\(([0-9]+)\\)';

export const DuniterRegexpStr = {
  USER_ID,
  CURRENCY,
  PUBKEY,
  REGEX_ENDPOINT_PARAMS: "( ([a-z_][a-z0-9-_.ğĞ]*))?( ([0-9.]+))?( ([0-9a-f:]+))?( ([0-9]+))( (.+))?",
  PUBKEY_WITH_CHECKSUM: "(" + PUBKEY +"):([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{3})",
  COMMENT: "[ a-zA-Z0-9-_:/;*\\[\\]()?!^\\+=@&~#{}|\\\\<>%.]*",
  INVALID_COMMENT_CHARS: "[^ a-zA-Z0-9-_:/;*\\[\\]()?!^\\+=@&~#{}|\\\\<>%.]*",
  URI: "([a-zA−Z0-9]+)://[ a-zA-Z0-9-_:/;*?!^\\+=@&~#|<>%.]+",
  // g1://[uid]:[pubkey]@[host]:[port]
  URI_WITH_AT: "(" + CURRENCY + ")://(?:(" + USER_ID + "):)?(" + PUBKEY + "@([a-zA-Z0-9-.]+.[ a-zA-Z0-9-_:/;*?!^\\+=@&~#|<>%.]+)",
  URI_WITH_PATH: "(" + CURRENCY + ")://([a-zA-Z0-9-.]+.[a-zA-Z0-9-_:.]+)/(" + PUBKEY + ")(?:/([A-Za-z0-9_-]+))?",
  BMA_ENDPOINT: DuniterEndpointApis.BMA + ENDPOINT_PARAMS,
  BMAS_ENDPOINT: DuniterEndpointApis.BMAS + ENDPOINT_PARAMS,
  WS2P_ENDPOINT: DuniterEndpointApis.WS2P + " ([a-f0-9]{8})" + ENDPOINT_PARAMS,
  BMATOR_ENDPOINT: DuniterEndpointApis.BMATOR + " ([a-z0-9-_.]*|[0-9.]+|[0-9a-f:]+.onion)(?: ([0-9]+))?",
  WS2PTOR_ENDPOINT: DuniterEndpointApis.WS2PTOR + " ([a-f0-9]{8}) ([a-z0-9-_.]*|[0-9.]+|[0-9a-f:]+.onion)(?: ([0-9]+))?(?: (.+))?",
  GVA_ENDPOINT: DuniterEndpointApis.GVA + ENDPOINT_PARAMS,
  // TX output conditions
  TX_OUTPUT_SIG,
  TX_OUTPUT_XHX,
  TX_OUTPUT_CSV,
  TX_OUTPUT_CLTV,
  TX_OUTPUT_FUNCTION,
  TX_OUTPUT_OPERATOR,
  TX_OUTPUT_FUNCTIONS: TX_OUTPUT_FUNCTION + '([ ]*' + TX_OUTPUT_OPERATOR + '[ ]*' + TX_OUTPUT_FUNCTION + ')*',
  OUTPUT_OBJ: 'OBJ\\(([0-9]+)\\)',
  OUTPUT_OBJ_OPERATOR: TX_OUTPUT_OBJ + '[ ]*' + TX_OUTPUT_OPERATOR + '[ ]*' + TX_OUTPUT_OBJ,
  TX_OUTPUT_OBJ_OPERATOR_AND: TX_OUTPUT_OBJ + '([ ]*&&[ ]*(' + TX_OUTPUT_OBJ + '))+',
  TX_OUTPUT_OBJ_OPERATOR_OR: TX_OUTPUT_OBJ + '([ ]*\\|\\|[ ]*(' + TX_OUTPUT_OBJ + '))+'
};
export const DuniterRegexps = {
  USER_ID: exact(DuniterRegexpStr.USER_ID),
  CURRENCY: exact(DuniterRegexpStr.CURRENCY),
  PUBKEY: exact(DuniterRegexpStr.PUBKEY),
  PUBKEY_WITH_CHECKSUM: exact(DuniterRegexpStr.PUBKEY_WITH_CHECKSUM),
  URI: exact(DuniterRegexpStr.URI),
  BMA_ENDPOINT: exact(DuniterRegexpStr.BMA_ENDPOINT),
  BMAS_ENDPOINT: exact(DuniterRegexpStr.BMAS_ENDPOINT),
  WS2P_ENDPOINT: exact(DuniterRegexpStr.WS2P_ENDPOINT),
  BMATOR_ENDPOINT: exact(DuniterRegexpStr.BMATOR_ENDPOINT),
  WS2PTOR_ENDPOINT: exact(DuniterRegexpStr.WS2PTOR_ENDPOINT),
  GVA_ENDPOINT: exact(DuniterRegexpStr.GVA_ENDPOINT),
  // TX output conditions
  TX_OUTPUT_SIG: exact(DuniterRegexpStr.TX_OUTPUT_SIG),
  TX_OUTPUT_FUNCTION: match(DuniterRegexpStr.TX_OUTPUT_FUNCTION),
  TX_OUTPUT_OBJ_OPERATOR_AND: match(DuniterRegexpStr.TX_OUTPUT_OBJ_OPERATOR_AND),
  TX_OUTPUT_OBJ_OPERATOR_OR: match(DuniterRegexpStr.TX_OUTPUT_OBJ_OPERATOR_OR),
  TX_OUTPUT_OBJ: match(TX_OUTPUT_OBJ),
  TX_OUTPUT_OBJ_OPERATOR: match(DuniterRegexpStr.TX_OUTPUT_OBJ_OPERATOR_AND),
  TX_OUTPUT_OBJ_PARENTHESIS: match('\\((' + TX_OUTPUT_OBJ + ')\\)'),
  TX_OUTPUT_FUNCTIONS: match(DuniterRegexpStr.TX_OUTPUT_FUNCTIONS)
};

export const DuniterConstants = {
  PROTOCOL_VERSION: 10,
  ROOT_BLOCK_HASH: 'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855'
};
