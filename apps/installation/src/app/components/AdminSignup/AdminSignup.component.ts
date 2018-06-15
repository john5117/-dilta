import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Signup } from '@dilta/commonwebui';
import { UtilService } from '@dilta/util';
import { AuthDataService, AuthService } from '@dilta/store';
import { Auth } from '@dilta/models';

import * as math from 'mathjs';
import { Subscription } from 'rxjs/Subscription';

/**
 * ui for signing up adminstartaions for login
 *
 * @export
 * @class AdminSignupComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-admin-signup',
  templateUrl: './AdminSignup.component.html',
  styleUrls: ['./AdminSignup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSignupComponent implements OnInit, OnDestroy {
  /**
   * error displayed by the sub component
   *
   * @memberof AdminSignupComponent
   */
  public err$ = new BehaviorSubject<string>(null);

  /**
   * levels of authorization passed to the subcomponent
   *
   * @public
   * @memberof AdminSignupComponent
   */
  public authLevels = ['Teacher', 'Busar', 'Manager', 'Administrator'];

  public schoolId: string;

  private localSubscription: Subscription[] = [];

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
   * @memberof AdminSignupComponent
   */
  signUp($event: Signup) {
    const id = this.util.randomuuid();
    this.auth.add({ ...$event, school: this.schoolId, id });
  }

  /**
   * changes the route
   *
   * @param {string} userId
   * @memberof AdminSignupComponent
   */
  changeRoute(auth: Auth) {
    if (auth) {
      this.route.navigateByUrl(`/biodata/${auth.id}`);
    }
  }

  /**
   * listen for manager section of the store changes
   *
   * @memberof AdminSignupComponent
   */
  storeListen() {
    this.localSubscription.push(this.onError(), this.onValue());
  }

  /**
   * listener for  entity error
   *
   * @memberof AdminSignupComponent
   */
  onError() {
    return this.auth.errors$
      .pipe(map(e => e.payload.error))
      .subscribe(this.sendError.bind(this));
  }

  /**
   * Listerner for entity value
   *
   * @memberof AdminSignupComponent
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
   * @memberof AdminSignupComponent
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
