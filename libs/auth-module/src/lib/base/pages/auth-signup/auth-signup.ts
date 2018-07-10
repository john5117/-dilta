import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '@dilta/models';
import { AuthService } from '@dilta/store';
import { UtilService } from '@dilta/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
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

  public schoolId: string;

  public localSubscription: Subscription[] = [];

  constructor(
    private route: Router,
    private _actR: ActivatedRoute,
    private util: UtilService,
    private auth: AuthService
  ) {}

  /**
   * action triggered by the sub components submit button
   *
   * @param {Signup} $event
   * @memberof AuthUserSignupBase
   */
  signUp($event: Signup) {
    const id = this.util.randomuuid();
    this.auth.add({ ...$event, school: this.schoolId, id });
  }

  /**
   * changes the route
   *
   * @param {string} userId
   * @memberof AuthUserSignupBase
   */
  changeRoute(auth: Auth) {
    if (auth) {
      this.route.navigate(['biodata'], { queryParams: { authId: auth.id, schoolId: this.schoolId }});
      // this.route.navigateByUrl(`/biodata/${auth.id}`);
    }
  }

  /**
   * listen for manager section of the store changes
   *
   * @memberof AuthUserSignupBase
   */
  storeListen() {
    this.localSubscription.push(this.onError(), this.onValue());
  }

  /**
   * listener for  entity error
   *
   * @memberof AuthUserSignupBase
   */
  onError() {
    return this.auth.errors$
      .pipe(map(e => e.payload.error))
      .subscribe(this.sendError.bind(this));
  }

  /**
   * Listerner for entity value
   *
   * @memberof AuthUserSignupBase
   */
  onValue() {
    return this.auth.entities$
      .pipe(map(e => e[0]))
      .subscribe(this.changeRoute.bind(this));
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
    this.schoolId = this._actR.snapshot.params['id'];
    this.storeListen();
  }

  ngOnDestroy() {
    this.localSubscription.forEach(e => e.unsubscribe());
    this.err$.unsubscribe();
  }
}
