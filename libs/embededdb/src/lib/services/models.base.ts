import { DBKollections, OfflineDB } from '@dilta/models';
import { RxCollection } from 'rxdb';
import { DBModel } from './db-abstract';

/**
 * base class for all model must adhere to has an interface for interaction
 *
 * @export
 * @class ModelBase
 * @implements {Model<T>}
 * @template T
 */
export class ModelBase<T> implements DBModel<T> {
  public collection: RxCollection<T>;

  constructor(
    private collectionName: keyof OfflineDB,
    database: DBKollections
  ) {
    this.collection = database[this.collectionName];
  }

  /**
   * to retrieve a single item
   *
   * @param {Partial<T>} query search params
   * @returns
   * @memberof ModelBase
   */
  async retrieve$(query: Partial<T>) {
    const res = await this.collection.findOne(query).exec();
    return res ? res.toJSON() : res;
  }

  /**
   * searchs for any items that matches the query defined
   *
   * @param {Partial<T>} query
   * @returns
   * @memberof ModelBase
   */
  find$(query: Partial<T>) {
    return this.collection
      .find(query)
      .exec()
      .then(res => res.map(e => e.toJSON()));
  }

  /**
   * creates a new one
   *
   * @param {Partial<T>} item
   * @returns
   * @memberof ModelBase
   */
  update$(id: string, item: Partial<T>) {
    return this.create$(item);
  }

  /**
   * creates a new item that matches
   *
   * @param {Partial<T>} item
   * @returns
   * @memberof ModelBase
   */
  create$(item: Partial<T>) {
    return this.collection.upsert(item).then(res => res.toJSON());
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
      .exec()
      .then(e => e.remove());
  }
}
