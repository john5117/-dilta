import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Log, LoggerBase  } from '@dilta/abstract-imp';

// TODO: Provide optional logger and config
import * as jsLogger from 'js-logger';

jsLogger.useDefaults();

/**
 * a wrapper along js logger
 *
 * @export
 * @class LoggerService
 */
@Injectable()
export class LoggerService extends LoggerBase implements LoggerBase {

  private logger = jsLogger;
  // constructor(private logger: Console) {
  constructor() {
    super();
  }
  /**
   * wrapper against jslogger.debug
   *
   * @param {Log} customLog
   * @memberof LoggerService
   */
  debug(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.debug(`${customLog.trace}:::${customLog.message}::${Date()}}`, other);
  }

  /**
   * wrapper against jslogger.log
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  log(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.log(`${customLog.trace}:::${customLog.message}::${Date()}}`, other);
  }

  /**
   * wrapper against jslogger.warn
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  warn(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.warn(`${customLog.trace}:::${customLog.message}::${Date()}}`, other);
  }

  /**
   * wrapper against jslogger.info
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  info(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.info(`${customLog.trace}:::${customLog.message}::${Date()}}`, other);
  }

  /**
   * wrapper against jslogger.error
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  error(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.error(`${customLog.trace}:::${customLog.message}::${Date()}}`, other);
  }

  action(location: string, data: { type: string }) {
    this.log(
      {
        message: `loading payload`,
        trace: location
      },
      data
    );
  }
}

