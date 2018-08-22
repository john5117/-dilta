import { Injectable } from '@angular/core';
import { DreamManagerService } from '@dilta/commonwebui/src/lib/services';
import { Manager } from '@dilta/models';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from './constants';
import { EntityDataBase } from './entitybase';

/**
 * Service thst instantite both the creation of the entity
 * and the effects
 *
 * @export
 * @class ManagerDataService
 * @extends {EntityDataBase<Manager>}
 */
@Injectable()
export class ManagerEntityGQLService extends EntityDataBase<Manager> {
  constructor(service: DreamManagerService) {
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
export class ManagerEntityService extends EntityServiceBase<Manager> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Manager, entityServiceFactory);
  }
}
