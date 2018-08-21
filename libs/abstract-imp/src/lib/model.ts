import { Observable } from 'rxjs/observable';

/**
 * Generic model operations reguarding database operations
 *
 * @export
 * @abstract
 * @class Model
 * @template T class or interface of the model
 */
export abstract class Model<T> {
  constructor(parameters) {}
  /**
   * method called to get a model from the database
   *
   * @abstract
   * @param {Partial<T>} id unique identifer to retrieve
   * @memberof Model
   */
  abstract retrieve$(query: string): Observable<T>;
  /**
   * method called to query the model from database
   *
   * @abstract
   * @param {Partial<T>} query query object info
   * @memberof Model
   */
  abstract find$(query: Partial<T>): Observable<T[]>;
  /**
   * method to update the item in the database
   *
   * @abstract
   * @param {Partial<T>} item item to be updated to
   * @memberof Model
   */
  abstract update$(item: Partial<T>): Observable<T>;
  /**
   * method called to delete the item in the database
   *
   * @abstract
   * @param {item} T unique identifer to delete
   * @memberof Model
   */
  abstract delete$(item: string): Observable<boolean>;
}
