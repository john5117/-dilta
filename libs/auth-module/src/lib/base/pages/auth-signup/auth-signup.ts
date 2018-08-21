import { OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFeature, AuthSignUp } from '@dilta/auth-module/src/lib/ngrx';
import { schoolFeature } from '@dilta/commonwebui/src/lib/ngrx';
import { Auth } from '@dilta/models';
import { AppConfiguration } from '@dilta/platform-config/src';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { first, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Signup } from '../../shared';

/**
 * base class for users authentication signup
 *
 * @export
 * @class AuthUserSignupBase
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
export class AuthUserSignupBase implements OnInit, OnDestroy {
  /**
   * error displayed by the sub component
   *
   * @memberof AuthUserSignupBase
   */
  public err$ = new BehaviorSubject<string>(null);

  /**
   * levels of authorization passed to the subcomponent
   *
   * @public
   * @memberof AuthUserSignupBase
   */
  public authLevels = ['Teacher', 'Busar', 'Manager', 'Administrator'];

  public localSubscription: Subscription[] = [];

  constructor(
    private config: AppConfiguration,
    private route: Router,
    private store: Store<any>
  ) {}

  /**
   * action triggered by the sub components submit button
   *
   * @param {Signup} $event
   * @memberof AuthUserSignupBase
   */
  signUp($event: Signup) {
    this.store.select(schoolFeature)
      .pipe(first())
      .subscribe(({ id }) => {
        this.store.dispatch(new AuthSignUp({ ...$event, school: id }));
      });
  }

  /**
   * changes the route
   *
   * @param {string} userId
   * @memberof AuthUserSignupBase
   */
  changeRoute(auth: Auth) {
    if (auth) {
      this.route.navigate([this.config.signupRedirect], {
        queryParams: { authId: auth.id }
      });
    }
  }

  /**
   * listen for manager section of the store changes
   *
   * @memberof AuthUserSignupBase
   */
  storeListen() {
    return this.store.select(AuthFeature)
      .pipe(
        map((state) => {
          if (state.error) {
            this.sendError(state.error);
            return;
          }
          this.changeRoute(state.details);
        })
      );
  }

  /**
   * sends the error to the child component for display
   *
   * @param {Error} err
   * @memberof AuthUserSignupBase
   */
  sendError(err: Error) {
    this.err$.next(err.message);
    setTimeout(() => {
      this.err$.next(null);
    }, 3000);
  }

  ngOnInit() {
    this.storeListen();
  }

  ngOnDestroy() {
    this.localSubscription.forEach(e => e.unsubscribe());
    this.err$.unsubscribe();
  }
}
