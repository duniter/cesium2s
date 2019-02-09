
export declare interface ServiceError {
  code: number;
  message: String;
}

export const ErrorCodes = {

  UNKNOWN_ERROR: 0,

  LOAD_ACCOUNT_ERROR: 1,
  BAD_PASSWORD: 2,
  UNKNOWN_ACCOUNT_UID: 3,
  UID_ALREADY_REGISTERED: 4,
  UNREACHABLE_NETWORK_ERROR: 4,
  UNKNOWN_NETWORK_ERROR: 5,
  ACCOUNT_NOT_EXISTS: 6,

  // DATA errors (load error)
  LOAD_PERSONS_ERROR: 100,

  TABLE_INVALID_ROW_ERROR: 350,

  UNAUTHORIZED: 401,
  AUTH_CHALLENGE_ERROR: 601,
  AUTH_SERVER_ERROR: 602
};

export const ServerErrorCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401, // not authentifcated
  FORBIDDEN: 403, // authentifcated but no access right
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  DATA_LOCKED: 520,
  BAD_UPDATE_DATE: 521,
  DENY_DELETION: 522
}