import { Auth, User } from '@dilta/models';
import {
  AuthActions,
  AuthActionTypes,
  Status
} from '@dilta/store/src/lib/auth/auth.action';
import { admin } from '@dilta/generator';

/**
 * Interface for a successfull Authentication
 *
 * @interface Authsuccess
 */
export interface Authsuccess {
  /**
   * current authentication status
   *
   * @type {string}
   * @memberof Authsuccess
   */
  status: string;
  /**
   * current user's auth ID
   *
   * @type {string}
   * @memberof Authsuccess
   */
  authId: string;
  /**
   * timestamp for the successful authentication of the
   * login User
   *
   * @type {(Date | string)}
   * @memberof Authsuccess
   */
  timeStamp: Date | string | number;
  /**
   * current user biodata information
   *
   * @type {User}
   * @memberof Authsuccess
   */
  user: User;

  /**
   * Any Error thrown for the Auth
   *
   * @type {Error}
   * @memberof Authsuccess
   */
  error?: Error;

  /**
   * the user's level
   *
   * @type {string}
   * @memberof Authsuccess
   */
  level?: string;
}

export const authInitialState: Authsuccess = {
  authId: null,
  status: Status.Pending,
  timeStamp: Date(),
  user: admin(),
  // user:  null,
  error: null
};

/**
 * reducer responsible for the authentication of the system
 *
 * @export
 * @param {any} [state=authInitialState]
 * @param {AuthActions} action
 * @returns {Authsuccess}
 */
export function authReducer(
  state = authInitialState,
  action: AuthActions
): Authsuccess {
  switch (action.type) {
    // when the login is succesfull
    case AuthActionTypes.Success: {
      return {
        // return new class state
        ...state,
        ...action.payload,
        error: null,
        status: Status.Success,
        timeStamp: Date()
      };
    }
    // when the login auth is loged - out
    case AuthActionTypes.LogOut: {
      return {
        ...authInitialState,
        status: Status.Success
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * interface for notifying the store of a succesful update
 *
 * @export
 * @interface AuthUpdateStatusPayload
 */
export interface AuthUpdateStatusPayload {
  /**
   * status of the operation
   *
   * @type {string}
   * @memberof AuthUpdateStatusPayload
   */
  status: string;
  /**
   * id of the auth user to updated
   *
   * @type {string}
   * @memberof AuthUpdateStatusPayload
   */
  id: string;
  /**
   * the updated auth detail
   *
   * @type {Auth}
   * @memberof AuthUpdateStatusPayload
   */
  update: Auth;
}
