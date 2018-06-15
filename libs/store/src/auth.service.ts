import { Auth } from '@dilta/models';
import { AuthModel } from '@dilta/offlinedatabase/src/model.tokens';
import {
  EntityCollectionDataService,
  EntityServiceBase,
  EntityServiceFactory
} from 'ngrx-data';
import { EntityDataBase } from './entitybase';
import { EntityNames } from './constants';
import { Inject, Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';

/**
 * Service responsible rest api implementations
 * the effects it require
 *
 * @export
 * @class AuthDataService
 * @extends {EntityBase<Auth>}
 */
@Injectable()
export class AuthDataService extends EntityDataBase<Auth> {
  constructor(@Inject(AuthModel) service: Model<Auth>) {
    super(EntityNames.Auth, service);
  }
}

/**
 * Service responsible for creating Auth Entity
 *
 * @export
 * @class AuthService
 * @extends {EntityServiceBase<Auth>}
 */
@Injectable()
export class AuthService extends EntityServiceBase<Auth> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Auth, entityServiceFactory);
  }
}
