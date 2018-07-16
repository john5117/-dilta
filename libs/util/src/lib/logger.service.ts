import { Injectable, Optional } from '@angular/core';
import { Log, LoggerBase } from '@dilta/abstract-imp';
// TODO: Provide optional logger and config
import * as pino from 'pino';
import { Level, Logger } from 'pino';

/**
 * a wrapper along js logger
 *
 * @export
 * @class LoggerService
 */
@Injectable()
export class LoggerService extends LoggerBase implements LoggerBase {
  private logger: Logger;

  constructor(
    @Optional() public loggerNameSpace: string = 'default',
    @Optional() loglevel?: Level,
  ) {
    super();
    this.logger = pino({ name: loggerNameSpace });
    this.logger.level = loglevel || this.logger.level;
  }
  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @memberof LoggerService
   */
  debug(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.debug(
      `${this.loggerNameSpace}:::${customLog.trace}:::${customLog.message}::${Date()}}`,
      other
    );
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  log(customLog: Log, ...other: any[]) {
    return this.info(customLog, ...other);
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  warn(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.warn(
      `${customLog.trace}:::${customLog.message}::${Date()}}`,
      other
    );
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  info(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.info(
      `${customLog.trace}:::${customLog.message}::${Date()}}`,
      other
    );
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @param {...any[]} other
   * @memberof LoggerService
   */
  error(customLog: Log, ...other: any[]) {
    this.validate(customLog);
    this.logger.error(
      `${customLog.trace}:::${customLog.message}::${Date()}}`,
      other
    );
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
