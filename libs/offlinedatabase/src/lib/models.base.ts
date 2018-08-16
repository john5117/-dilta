import { Model } from '@dilta/abstract-imp';
import { OfflineDB } from '@dilta/models';
import { RxCollection } from 'rxdb';
import { Observable } from 'rxjs/observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, switchMap, debounceTime, delay } from 'rxjs/operators';

/**
 * base class for all model must adhere to has an interface for interaction
 *
 * @export
 * @class ModelBase
 * @implements {Model<T>}
 * @template T
 */
export class ModelBase<T> implements Model<T> {
  public collection: RxCollection<T>;

  constructor(
    collectionName: keyof OfflineDB,
    database: Observable<OfflineDB>
  ) {
    this.collection = database[collectionName];
  }

  /**
   * to retrieve a single item
   *
   * @param {Partial<T>} query search params
   * @returns
   * @memberof ModelBase
   */
  retrieve$(query: Partial<T>) {
    return fromPromise(this.collection.findOne(query).exec()).pipe(
      map(res => (res ? res.toJSON() : res))
    );
  }

  /**
   * searchs for any items that matches the query defined
   *
   * @param {Partial<T>} query
   * @returns
   * @memberof ModelBase
   */
  find$(query: Partial<T>) {
    return fromPromise(this.collection.find(query).exec()).pipe(
      map(res => res.map(e => e.toJSON()))
    );
  }

  /**
   * updates the item that matches or creates a new one
   *
   * @param {Partial<T>} item
   * @returns
   * @memberof ModelBase
   */
  update$(item: Partial<T>) {
    return fromPromise(this.collection.upsert(item)).pipe(
      map(res => res.toJSON())
    );
  }

  /**
   * delete item that match the query
   *
   * @param {Partial<T>} query
   * @returns
   * @memberof ModelBase
   */
  delete$(query: Partial<T>) {
    return this.collection
      .findOne(query)
      .$.pipe(switchMap(e => fromPromise(e.remove())));
  }
}
