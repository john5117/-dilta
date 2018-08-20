import { ApiResponse } from '@dilta/authentication/src/lib/shared';

/**
 * Errors thrown from failed Api Response
 *
 * @export
 * @class ApiResponseError
 * @extends {Error}
 */
export class ApiResponseError extends Error {

  /** formats the response to the error code */
  static formatApiError (res: ApiResponse<any> ) {
    const { code, error, status,  } = res;
    return `${code}:: ${error} ::${status}`;
  }

  constructor(res: ApiResponse<any>) {
    super(ApiResponseError.formatApiError(res));
  }
}
