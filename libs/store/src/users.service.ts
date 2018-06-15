import { Injectable, Inject } from '@angular/core';
import { EntityServiceFactory, EntityServiceBase } from 'ngrx-data';

import { User } from '@dilta/models';
import { Model } from '@dilta/abstract-imp';

import { EntityDataBase } from './entitybase';
import { EntityNames } from './constants';
import { UserModel } from '@dilta/offlinedatabase/src/model.tokens';

/**
 * Service thst instantite both the creation of the entity
 * and the effects
 *
 * @export
 * @class UserDataService
 * @extends {EntityDataBase<User>}
 */
@Injectable()
export class UserDataService extends EntityDataBase<User> {
  constructor(@Inject(UserModel) service: Model<User>) {
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
export class UserService extends EntityServiceBase<User> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.User, entityServiceFactory);
  }
}
