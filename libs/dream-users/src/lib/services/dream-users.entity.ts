import { Injectable } from '@angular/core';
import { EntityNames } from '@dilta/commonwebui/src/lib/ngrx/entities/constants';
import { EntityDataBase } from '@dilta/commonwebui/src/lib/ngrx/entities/entitybase';
import { User } from '@dilta/models';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { DreamUserService } from './dream-users.service';

/**
 * Service thst instantite both the creation of the entity
 * and the effects
 *
 * @export
 * @class UserDataService
 * @extends {EntityDataBase<User>}
 */
@Injectable()
export class UserEntityGQLService extends EntityDataBase<User> {
  constructor(service: DreamUserService) {
    super(EntityNames.User, service);
  }

}

/**
 * Service responsible for creating User Entity
 *
 * @export
 * @class UserService
 * @extends {EntityServiceBase<User>}
 */
@Injectable()
export class UserEntityService extends EntityServiceBase<User> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.User, entityServiceFactory);
  }
}
