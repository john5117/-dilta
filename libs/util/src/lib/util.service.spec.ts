/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilService } from './util.service';
import { cold, hot } from 'jasmine-marbles';
import { RxError } from 'rxdb';

describe('Service: Util', () => {
  let utilSvc: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilService]
    });

    utilSvc = TestBed.get(UtilService);
  });

  it('wrapTo::: should return observable of the value from the await-to promise', () => {
    const text = 'texts';
    const frmPromise = Promise.resolve<[Error, string]>([null, text]);
    const response = cold('-a|', { a: text });
    expect(utilSvc.wrapTo<string>(frmPromise)).toBeObservable(response);
  });

  it('wrapTo::: should return observable of the error from the await-to promise', () => {
    const err = new Error('custom error');
    const frmPromise = Promise.resolve<[Error, string]>([err, null]);
    const response = cold('-#|', {}, err);
    expect(utilSvc.wrapTo<string>(frmPromise)).toBeObservable(response);
  });

  it(`displayErr::: should format error by calling formatError method`, () => {
    const spy = spyOn(utilSvc, 'formatError');
    const err = new Error('custom error');
    expect(spy).toHaveBeenCalled();
  });

  it(`formatError::: format the error viewing`, () => {
    const err = new Error('custom error');
    const response = utilSvc.formatError(err);
    expect(response.message).toBe(err.message);
  });
});
