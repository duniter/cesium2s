export declare interface ServiceError {
  code: number;
  message: string;
  reject?: (err: never) => void;
}

export const ErrorCodes = {
  UNKNOWN_ERROR: 0,
};

export const ServerErrorCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401, // not authenticated
  FORBIDDEN: 403, // authenticated but no access right
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,

  // Duniter error
  // TODO

  // Subsquid indexer error
  // TODO
};
