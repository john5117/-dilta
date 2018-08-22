import { Injectable } from '@angular/core';
import { DreamSettingService } from '@dilta/commonwebui/src/lib/services';
import { Setting } from '@dilta/models';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from './constants';
import { EntityDataBase } from './entitybase';

/**
 * Service thst instantite both the creation of the entity
 * and the effects
 *
 * @export
 * @class SettingDataService
 * @extends {EntityDataBase<Setting>}
 */
@Injectable()
export class SettingEntityGQLService extends EntityDataBase<Setting> {
  constructor(service: DreamSettingService) {
    super(EntityNames.Setting, service);
  }

}

/**
 * Service responsible for creating Setting Entity
 *
 * @export
 * @class SettingService
 * @extends {EntityServiceBase<Setting>}
 */
@Injectable()
export class SettingEntityService extends EntityServiceBase<Setting> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Setting, entityServiceFactory);
  }
}
