import { ApiResponse } from '@dilta/authentication/src/lib/shared';
import { GraphQLError } from 'graphql';

/**
 * Errors thrown from failed Api Response
 *
 * @export
 * @class ApiResponseError
 * @extends {Error}
 */
export class ApiResponseError extends Error {
  /** formats the response to the error code */
  static formatApiError(res: ApiResponse<any>) {
    const { code, error, status } = res;
    return `${code}:: ${error} ::${status}`;
  }

  constructor(res: ApiResponse<any>) {
    super(ApiResponseError.formatApiError(res));
  }
}

/** error thrown for ApolloResponseError */
export class ApolloResponseError extends Error {

  /** formats array of errors */
  static formatApolloError(err: GraphQLError[]) {
    return err
      .map(e => `${e.path} ${e.message}`)
      .reduce((p, c) => `${p} ${c}`, '');
  }

  constructor(err: GraphQLError[]) {
    super(ApolloResponseError.formatApolloError(err));
  }
}
