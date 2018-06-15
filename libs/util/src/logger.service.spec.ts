/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Log, logError } from '@dilta/abstract-imp';
import { LoggerService } from './logger.service';
import * as jsLogger from 'js-logger';

describe('Service: Logger', () => {
  const fakeCall = () => { };
  const test: Log = {
    message: `my custom log message`,
    trace: `test`
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
  });

  it('log:::should call jsLogger log function', inject([LoggerService],
    (service: LoggerService) => {
      const spy = spyOn(jsLogger, 'log').and.callFake(fakeCall);
      service.log(test);
      service.log(test, 'test');
      expect(spy).toHaveBeenCalled();
    }));

  it('warn:::should call jsLogger warn function', inject([LoggerService],
    (service: LoggerService) => {
      const spy = spyOn(jsLogger, 'warn').and.callFake(fakeCall);
      service.warn(test);
      service.warn(test, 'test');
      expect(spy).toHaveBeenCalled();
    }));

  it('debug:::should call jsLogger debug function', inject([LoggerService],
    (service: LoggerService) => {
      const spy = spyOn(jsLogger, 'debug').and.callFake(fakeCall);
      service.debug(test);
      service.debug(test, 'test');
      expect(spy).toHaveBeenCalled();
    }));

  it('error:::should call jsLogger error function', inject([LoggerService],
    (service: LoggerService) => {
      const spy = spyOn(jsLogger, 'error').and.callFake(fakeCall);
      service.error(test);
      service.error(test, 'test');
      expect(spy).toHaveBeenCalled();
    }));

  it('info:::should call jsLogger info function', inject([LoggerService],
    (service: LoggerService) => {
      const spy = spyOn(jsLogger, 'info').and.callFake(fakeCall);
      service.info(test);
      service.info(test, 'test');
      expect(spy).toHaveBeenCalled();
    }));

  it('validate:::should throw error for invalid log object', inject([LoggerService],
    (service: LoggerService) => {
      const values = [undefined, { trace: 'missing message' }, { message: 'missing trace' }];
      values.forEach((e) => {
        expect(() => service.validate(e as any)).toThrowError(logError.message);
      });
    }));

});
