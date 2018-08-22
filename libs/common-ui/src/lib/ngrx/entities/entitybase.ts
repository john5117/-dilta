import { Model } from '@dilta/abstract-imp';
import { EntityCollectionDataService, Update } from 'ngrx-data';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';

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
    return this.dataSvc.update$(item);
  }

  delete(id: string) {
    return this.dataSvc.delete$({ id } as any).pipe(map(b => null));
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
