/**
 * API RESPONSE STATUS CODE
 *
 * @export
 * @enum {number}
 */
export enum API_STATUS_CODE {
  AuthFailure = 401
}

/**
 * API RESPONSE TEXT
 *
 * @export
 * @enum {number}
 */
export enum API_STATUS_RESPONSE {
  success = 'success',
  faiure = 'failure'
}

/**
 * Interface for Api Response Interface
 *
 * @export
 * @interface ApiResponse
 * @template T
 */
export interface ApiResponse<T> {
  /** response textual information */
  status: API_STATUS_RESPONSE;
  /** response code  */
  code: API_STATUS_CODE;
  /** time of response */
  time: number;
  /** typeof data response */
  data?: T;
  /** error message */
  error?: string;
}


/**
 * Formats api response for the authnetication
 *
 * @template T
 * @param {T} details
 * @returns
 */
export function successResponse<T>(details:  T) {
  return {
    code: API_STATUS_CODE.AuthFailure,
    data: details,
    status: API_STATUS_RESPONSE.success,
    time: Date.now()
  };
}


/**
 * Authentication Data response interface
 *
 * @export
 * @interface AuthDataResponse
 * @template T
 */
export interface AuthDataResponse<T> {
  token: string;
  details: Partial<T>;
}



/**
 * formats failure response for authentication
 *
 * @param {(Error | string)} err
 * @returns
 */
export function failureResponse(err: Error | string) {
  return {
    code: API_STATUS_CODE.AuthFailure,
    error: err.toString(),
    status: API_STATUS_RESPONSE.faiure,
    time: Date.now()
  };
}
