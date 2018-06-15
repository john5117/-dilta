import { EntityCollectionDataService, Update } from 'ngrx-data';

import { User } from '@dilta/models';
import { Database } from '@dilta/offlinedatabase/src/Database';
import { Observable } from 'rxjs/observable';
import { Model } from '@dilta/abstract-imp';

/**
 * EntityBase setups the effects for corresponding actions
 * for any defined Entity
 *
 * @class EntityDataBase
 * @implements {EntityCollectionDataService<T>}
 * @template T
 */
export class EntityDataBase<T> implements EntityCollectionDataService<T> {
  constructor(readonly name: string, private dataSvc: Model<T>) {}

  add(item: T) {
    console.log('called add service');
    return this.dataSvc.update$(item);
  }

  delete(id: string) {
    return this.dataSvc.delete$({ id } as any).map(b => null);
  }

  getWithQuery(query) {
    return this.dataSvc.find$(query);
  }

  getAll() {
    return this.dataSvc.find$({});
  }

  getById(id: string) {
    return this.dataSvc.retrieve$({ id } as any);
  }

  update(item: Update<T>) {
    return (this.dataSvc.update$(item as any) as any) as Observable<Update<T>>;
  }
}
