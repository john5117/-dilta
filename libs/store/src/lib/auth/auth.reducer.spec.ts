import * as authActions from './actions';
import { AuthKoll } from '../../../../../mainframe/src/auth.model';
import { UserKoll } from '../../../../../mainframe/src/user.model';
import { Status } from './actions';
import {
  authQueryReducer,
  authInitialState,
  initalAuthQueryState,
  AuthQueryState,
  authReducer,
  Authsuccess,
  AuthUpdateStatusPayload
} from './auth.reducer';

describe('authReducer::: Responsible for the user to login in to the system', () => {
  it('should save the login details in the store', () => {
    spyOn(window as any, 'Date').and.returnValue('mydate');
    const _suc = {
      authId: 'authId',
      level: 'level',
      user: { id: 'id' } as any,
      timeStamp: 'mytimestamp'
    } as any;
    const expected: Authsuccess = {
      ..._suc,
      error: null,
      status: Status.Success,
      timeStamp: Date()
    };
    expect(
      authReducer(authInitialState, new authActions.AuthLoginSuccess(_suc))
    ).toEqual(expected);
  });

  it('should add the error to the store during login and signup', () => {
    spyOn(window as any, 'Date').and.returnValue('mydate');
    const error = new Error('custom error');
    const expected: Authsuccess = {
      ...authInitialState,
      error,
      status: Status.Failure
    };
    expect(
      authReducer(authInitialState, new authActions.AuthLoginFailure(error))
    ).toEqual(expected);
    expect(
      authReducer(authInitialState, new authActions.AuthSignUpFailure(error))
    ).toEqual(expected);
  });

  it('should logout logined user details from the store', () => {
    spyOn(window as any, 'Date').and.returnValue('mydate');
    const expected: Authsuccess = {
      ...authInitialState,
      status: Status.Success
    };
    expect(authReducer(authInitialState, new authActions.AuthLogOut())).toEqual(
      expected
    );
  });
});

describe('authQueryReducer::: responsible for holding the query response of the reducer', () => {
  it('should save the find result to the store', () => {
    const result = [];
    expect(
      authQueryReducer(
        initalAuthQueryState,
        new authActions.AuthFindSuccess(result)
      )
    ).toEqual(<AuthQueryState>{ ...initalAuthQueryState, find: { result } });
  });

  it('should save the findOne result to the store', () => {
    const result = {} as any;
    expect(
      authQueryReducer(
        initalAuthQueryState,
        new authActions.AuthFindOneSuccess(result)
      )
    ).toEqual(<AuthQueryState>{ ...initalAuthQueryState, findOne: { result } });
  });

  it('should save the update result to the store', () => {
    const result = {} as any;
    expect(
      authQueryReducer(
        initalAuthQueryState,
        new authActions.AuthUpdateSuccess(result)
      )
    ).toEqual(<AuthQueryState>{ ...initalAuthQueryState, findOne: { result } });
  });

  it('should error the find section of the store', () => {
    const error = new Error('custom error');
    expect(
      authQueryReducer(
        initalAuthQueryState,
        new authActions.AuthFindFailure(error)
      )
    ).toEqual(<AuthQueryState>{ ...initalAuthQueryState, find: { error } });
  });

  it('should error the findOne section of the store', () => {
    const error = new Error('custom error');
    expect(
      authQueryReducer(
        initalAuthQueryState,
        new authActions.AuthFindOneFailure(error)
      )
    ).toEqual(<AuthQueryState>{ ...initalAuthQueryState, findOne: { error } });
  });

  it('should error the findOne section of the store', () => {
    const error = new Error('custom error');
    expect(
      authQueryReducer(
        initalAuthQueryState,
        new authActions.AuthUpdateFailure(error)
      )
    ).toEqual(<AuthQueryState>{ ...initalAuthQueryState, update: { error } });
  });
});
