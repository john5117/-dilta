import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { RxError } from 'rxdb';
import * as uuidRandom from 'uuid/v4';
import { dictSchool } from '@dilta/presets';
import { formatError } from '@dilta/screwbox';

@Injectable()
export class UtilService {
  /**
   * remaps the preset to a nice json dictionary
   *
   * @public
   * @memberof UtilService
   */
  public schoolPreset = dictSchool;

  /**
   * Error formater function
   *
   * @private
   * @memberof UtilService
   */
  public formatError = formatError;

  constructor() {}

  /**
   * converts await-to map to an observable
   *
   * @template T
   * @param {Promise<[Error, T]>} qu the promise function to convert to observavle
   * @returns
   * @memberof UtilService
   */
  wrapTo<T>(qu: Promise<[Error, T]>) {
    return fromPromise(qu).map(res => this.cleanErrorValue<T>(res));
  }

  /**
   * Extract Error value from an array like await-to result format
   *
   * @template T
   * @param {[Error, T]} [err, value]
   * @returns
   * @memberof UtilService
   */
  cleanErrorValue<T>([err, value]: [Error, T]) {
    if (err) {
      throw err;
    }
    return value;
  }

  /**
   * displays the error to the view
   *
   * @param {RxError} err
   * @memberof UtilService
   */
  displayErr(err: RxError | Error) {
    this['err'] = this.formatError(err);
    console.log('this.err', this['err']);
  }

  /**
   * generates a random uuid string
   * 
   * @returns 
   * @memberof UtilService
   */
  randomuuid() {
    return uuidRandom();
  }

}
