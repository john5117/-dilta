import { Inject, Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { Login } from '@dilta/auth-module/src/lib/ngrx';
import { Auth } from '@dilta/models';
import { AuthModel } from '@dilta/offlinedatabase/src/lib/model.tokens';
import { EntityNames } from '@dilta/store/src/lib/entities/constants';
import { EntityDataBase } from '@dilta/store/src/lib/entities/entitybase';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';

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
    // this.
  }

  login(details: Login) {
    // this.store.dispatch
    return this.getById(details.username);
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

// TODO:: Setup The down errors.

/** error thrown when the password doesn't match */
export const invalidPasswordError = new Error(
  `incorrect password passed, try again the correct password`
);

/** error thrown when an auth object not found */
export const authInfoNotFoundError = new Error(
  `Authentication Information doesn't exist`
);

/** error thrown when a user has login but his or biodata info is not found */
export const authUserBioNotFoundError = new Error(`User Biodata information not found after successfull login,
deleting login information and registar on the program`);
