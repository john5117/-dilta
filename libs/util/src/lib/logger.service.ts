import { FactoryProvider } from '@angular/core';
import { Log, LoggerBase } from '@dilta/abstract-imp';
import { Level } from 'pino';


export type logNameSpace = 'default' | string;

/**
 * a wrapper along js logger
 *
 * @export
 * @class LoggerService
 */
// @Injectable()
export class LoggerService extends LoggerBase implements LoggerBase {
  private logger; // : Logger;

  constructor(public loggerNameSpace: string, loglevel?: string) {
    super();
    this.logger =  console; // pino({ name: loggerNameSpace, prettyPrint: true } as any);
    this.logger.level = (loglevel as any) || this.logger.level;
  }

  /**
   * wrapper for a cross platform logger
   *
   * @param {Log} customLog
   * @memberof LoggerService
   */
  debug(customLog: Log, ...other: any[]) {
    // return this.info(customLog, ...other);
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

/**
 * dynamically creates logger with data
 *
 * @export
 * @param {string} [name='default']
 * @param {Level} [loglevel='info']
 * @returns
 */
export function loggerServiceFactory(
  name: string = 'default',
  loglevel: Level = 'info'
): FactoryProvider {
  const logger = () => new LoggerService(name, loglevel);
  return {
    provide: LoggerService,
    useFactory: logger
  };
}
