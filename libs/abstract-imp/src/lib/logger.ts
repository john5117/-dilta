/**
 * logging interface for logs
 *
 * @export
 * @interface Log
 */
export interface Log {
  /**
   * a string containging the loacation of the log
   * i.e LogComponent or LogService
   *
   * @type {string}
   * @memberof Log
   */
  trace: string;
  /**
   * custom log message passed to the object
   *
   * @type {string}
   * @memberof Log
   */
  message: string;
}

/**
 * Abstract base class for implementing loggers functionality
 *
 * @abstract
 * @class LoggerBase
 */
export abstract class LoggerBase {
  /**
   * default logging functionality implementation
   *
   * @abstract
   * @param {string} location
   * @param {...any[]} logargs
   * @memberof LoggerBase
   */

  abstract log(doc: Log, ...logargs: any[]): void;
  /**
   * debug logging functionality implementation
   *
   * @abstract
   * @param {string} location
   * @param {...any[]} logargs
   * @memberof LoggerBase
   */
  abstract debug(doc: Log, ...logargs: any[]): void;
  /**
   * warning logging functionality implementation
   *
   * @abstract
   * @param {string} location
   * @param {...any[]} logargs
   * @memberof LoggerBase
   */
  abstract warn(doc: Log, ...logargs: any[]): void;
  /**
   * error logging functionality implementation
   *
   * @abstract
   * @param {string} location
   * @param {Error} err
   * @param {...any[]} [logargs]
   * @memberof LoggerBase
   */
  abstract error(doc: Log, err: Error, ...logargs: any[]): void;

  /**
   * validates if the log is a valid log object
   *
   * @param {Log} customLog
   * @memberof LoggerService
   */
  validate(customLog: Log) {
    if (
      !customLog ||
      typeof customLog.message !== 'string' ||
      typeof customLog.trace !== 'string'
    ) {
      throw logError;
    }
  }
}

/** error object thrown when the log object is invalid */
export const logError = new Error(
  `expect a valid log to have a [trace and message] params`
);
