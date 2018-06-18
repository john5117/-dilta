import { Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { Observable } from 'rxjs/observable';
import { RxCollection, RxDocument } from 'rxdb';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { OfflineDB } from '@dilta/models';
import { formatError } from '@dilta/screwbox';

/**
 * base class for all model must adhere to has an interface for interaction
 *
 * @export
 * @class ModelBase
 * @implements {Model<T>}
 * @template T
 */
export class ModelBase<T> implements Model<T> {
  private collection: RxCollection<T>;

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
    return this.collection.findOne(query).$.pipe(map(res => res.toJSON()));
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
      .$.pipe(map(res => res.map(e => e.toJSON())));
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
