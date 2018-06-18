import { Inject, Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { Manager } from '@dilta/models';
import { ManagerModel } from '@dilta/offlinedatabase/src/lib/model.tokens';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from './constants';
import { EntityDataBase } from './entitybase';



/**
 * ManagerDataService resonsible for creation of the entity
 * and effects for it
 *
 * @export
 * @class ManagerDataService
 * @extends {EntityDataBase<Manager>}
 */
@Injectable()
export class ManagerDataService extends EntityDataBase<Manager> {
  constructor(@Inject(ManagerModel) service: Model<Manager>) {
    super(EntityNames.Manager, service);
  }
}

/**
 * Service responsible for creating Manager Entity
 *
 * @export
 * @class ManagerService
 * @extends {EntityServiceBase<Manager>}
 */
@Injectable()
export class ManagerService extends EntityServiceBase<Manager> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Manager, entityServiceFactory);
  }
}
