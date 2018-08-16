import { Action } from '@ngrx/store';
import { Authsuccess } from '@dilta/store/src/lib/auth/auth.reducer';

export enum Status {
  Pending = 'PENDING',
  Failure = 'FAILURE',
  Success = 'SUCCESS'
}

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AuthActionTypes {
  Login = '[Auth] [LOGIN]  REQUEST',
  LoginFailure = '[Auth] [LOGIN]  FAILURE',
  Success = '[Auth] [LOGIN] SUCCESS',
  LogOut = '[Auth] LOGOUT'
}

/**
 * interface for login in to the program
 *
 * @export
 * @interface Login
 */
export interface Login {
  username: string;
  password: string;
}

/**
 * Action dispatched to login a user into the program
 *
 * @export
 * @class AuthLogin
 * @implements {Action}
 */
export class AuthLogin implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Login) {}
}

/**
 * Action dispatched while an authentication is successfull
 * to the store
 *
 * @export
 * @class AuthSuccess
 * @implements {Action}
 */
export class AuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.Success;
  constructor(public payload: Authsuccess) {}
}

/**
 * Action disptached while an error occurs when a user attempts
 * a login
 *
 * @export
 * @class AuthLoginFailure
 * @implements {Action}
 */
export class AuthLoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: Error) {}
}

/**
 * Action dispatched while a user wants to logout from the system
 *
 * @export
 * @class AuthLogOut
 * @implements {Action}
 */
export class AuthLogOut implements Action {
  readonly type = AuthActionTypes.LogOut;
  constructor() {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AuthActions =
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginFailure
  | AuthLogOut;
