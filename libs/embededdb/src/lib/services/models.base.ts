import { EmbeddedRxDBError } from '@dilta/embededdb/src/lib/services/errors';
import { BaseModel, DBKollections, OfflineDB } from '@dilta/models';
import { defaultPreInsert, defaultPreSave } from '@dilta/models/src/rxdb/shared.model';
import { throwError } from '@dilta/screwbox';
import { to } from 'await-to-js';
import { autobind } from 'core-decorators';
import { RxCollection, RxError } from 'rxdb';
import { DBModel } from './db-abstract';


/**
 * base class for all model must adhere to has an interface for interaction
 *
 * @export
 * @class ModelBase
 * @implements {Model<T>}
 * @template T
 */
@autobind()
export class ModelBase<T extends Partial<BaseModel>> implements DBModel<T> {
  public collection: RxCollection<T>;

  constructor(
    private collectionName: keyof OfflineDB,
    public database: DBKollections
  ) {
    this.collection = this.database[this.collectionName];
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
  async update$(id: string, item: Partial<T>) {
    // important due rxdb lifecycle hooks
    item = defaultPreSave(item);
    const [err, newItem] = await to(this.collection.upsert(item).then(res => res.toJSON()));
    this.cleanError(err);
    return newItem;
  }

  /**
   * creates a new item that matches
   *
   * @param {Partial<T>} item
   * @returns
   * @memberof ModelBase
   */
  async create$(item: Partial<T>) {
    // important due rxdb lifecycle hooks
    let err: RxError;
    item = defaultPreInsert(item as any as T);
    [err, item] = await to(this.collection.upsert(item).then(res => res.toJSON()));
    this.cleanError(err);
    return item as any as T;
  }

  /**
   * delete item that match the query
   *
   * @param {Partial<T>} query
   * @returns
   * @memberof ModelBase
   */
  async delete$(query: Partial<T>) {
    const [err, success] = await to(this.collection
      .findOne(query)
      .exec()
      .then(e => e.remove()));
      this.cleanError(err);
    return success;
  }

  /**
   * cleans and throwError
   *
   * @param {RxError} err
   * @memberof ModelBase
   */
  cleanError(err: RxError) {
    if (err) {
      throwError(err.rxdb ? new EmbeddedRxDBError(err) : err );
    }
  }
}
