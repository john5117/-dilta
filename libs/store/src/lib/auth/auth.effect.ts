import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';
import {
  AuthDataService,
  UserDataService
} from '@dilta/store/src/lib/entities';
import * as AuthActions from '@dilta/store/src/lib/auth/auth.action';
import { Authsuccess } from '@dilta/store/src/lib/auth/auth.reducer';

const { AuthActionTypes, Status } = AuthActions;

async function validatePassword(hash, password) {
  return true;
}

@Injectable()
export class AuthEffects {
  /**
   * side-effect triggered when a user attempts to login ino the program
   *
   * @memberof AuthEffects
   */
  @Effect()
  login$ = this.actions$
    .ofType<AuthActions.AuthLogin>(AuthActionTypes.Login)
    .pipe(
      // changing action to payload only
      map(action => action.payload),
      // querying for various actions to login
      switchMap(payload => this.auth.login(payload)),
      // get user biodata information with auth details
      switchMap(auth => this.userDataSvc.getWithAuthId(auth.username)),
      // maps to successfull Auth Interface
      map(
        bio =>
          <Authsuccess>{
            authId: bio.authId,
            status: Status.Success,
            timeStamp: Date.now().toString(),
            user: bio
          }
      ),
      // alerting the store of the successfull operation
      map(stampedBio => new AuthActions.AuthLoginSuccess(stampedBio)),
      // notify the store of any error
      catchError(err => of(new AuthActions.AuthLoginFailure(err)))
    );

  constructor(
    private actions$: Actions,
    private auth: AuthDataService,
    private userDataSvc: UserDataService
  ) {}
}
