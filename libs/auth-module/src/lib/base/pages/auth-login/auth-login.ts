import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '@dilta/util';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthFeature, AuthLogin, Authsuccess, Login } from '../../../ngrx';

/**
 * Base class for authentication of the users.
 *
 * @export
 * @class AuthUserLoginBase
 * @implements {OnInit}
 */
export class AuthUserLoginBase implements OnInit {
  public err$ = new BehaviorSubject(undefined);

  constructor(
    private store: Store<any>,
    private route: Router,
    private _actR: ActivatedRoute,
    private util: UtilService
  ) {}

  /**
   * dispath ation to login
   *
   * @param {Login} evnt
   * @memberof AuthUserLoginBase
   */
  login(evnt: Login) {
    this.store.dispatch(new AuthLogin(evnt));
  }

  /**
   * changes the route if auth is valid
   *
   * @param {Authsuccess} auth
   * @returns
   * @memberof AuthUserLoginBase
   */
  changeRoute(auth: Authsuccess) {
    if (!auth.details) {
      return;
    }
    this.route.navigateByUrl('*');
  }

  /**
   * displays the error to the child component
   *
   * @param {Error} err
   * @memberof AuthUserLoginBase
   */
  displayError(err: Error) {
    this.err$.next(err.message);
    setTimeout(() => {
      this.err$.next(undefined);
    }, 4000);
  }

  /**
   * listens for auth feature changes
   *
   * @memberof AuthUserLoginBase
   */
  onValue() {
    this.store
      .select(AuthFeature)
      .pipe(
        map(store => {
          if (store.error) {
            throw store.error;
          }
          return store;
        })
      )
      .subscribe(this.changeRoute.bind(this), this.displayError.bind(this));
  }

  ngOnInit() {
    this.onValue();
  }
}
