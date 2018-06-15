import { Injectable, Inject } from '@angular/core';
import { EntityServiceFactory, EntityServiceBase } from 'ngrx-data';

import { Manager } from '@dilta/models';
import { Model } from '@dilta/abstract-imp';

import { EntityDataBase } from './entitybase';
import { EntityNames } from './constants';
import { ManagerModel } from '@dilta/offlinedatabase/src/model.tokens';

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
