import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { schoolFeature } from '@dilta/common-ui/src/lib/ngrx';
import { UserEntityService } from '@dilta/dream-users/src/lib/services/dream-users.entity';
import { School, User } from '@dilta/models';
import { SchoolDict } from '@dilta/presets';
import { UtilService } from '@dilta/util';
import { Store } from '@ngrx/store';
import { RxError } from 'rxdb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { combineLatest, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

export interface BiodataFormPageARQMap {
  authId: string;
}

export class UserBioDataFormPageBase implements OnInit, OnDestroy {
  /**
   * required keys for the database
   *
   * @static
   * @memberof UserBioDataFormPageBase
   */
  static requiredKeys = [
    'id',
    'name',
    'gender',
    'phoneNo',
    'class',
    'subject',
    'phoneNos',
    'level',
    'address',
    'image',
    'email',
    'authId',
    'school'
  ];

  /**
   * obbservable of mapped school json
   *
   * @private
   * @type {Observable<SchoolDict>}
   * @memberof UserBioDataFormPageBase
   */
  private school$: Observable<SchoolDict>;

  private localSubscription: Subscription[] = [];

  /**
   * err displayed to the view
   *
   * @private
   * @type {string}
   * @memberof UserBioDataFormPageBase
   */
  public err$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  /**
   * array containing classes
   *
   * @private
   * @type {string[]}
   * @memberof UserBioDataFormPageBase
   */
  public view$: BehaviorSubject<SchoolDict> = new BehaviorSubject(<SchoolDict>{
    classes: [],
    permisions: [],
    subjects: []
  });

  constructor(
    private _actR: ActivatedRoute,
    private route: Router,
    private util: UtilService,
    private user: UserEntityService,
    private store: Store<any>
  ) {}

  /**
   * remaps the event by changing it properities to
   * valid object for the database
   *
   * @param {*} $event
   * @returns
   * @memberof UserBioDataFormPageBase
   */
  remapEvent$($event: any) {
    const event$ = of($event);
    const authId$ = this._actR.queryParams.pipe(
      map((params: BiodataFormPageARQMap) => params.authId)
    );
    const schoolId$ = this.store
      .select(schoolFeature)
      .pipe(map(school => school.id));
    return event$.pipe(
      combineLatest(authId$, schoolId$),
      map(this.remap.bind(this))
    );
  }

  /**
   * changes the event to the standard user event
   *
   * @param {[User, string, string]} [event, schoolId, authId]
   * @returns
   * @memberof UserBioDataFormPageBase
   */
  remap([event, authId, schoolId]: [User, string, string]) {
    event.authId = authId;
    event.school = schoolId;
    return event;
  }

  /**
   * dispatch an action to save the school biodata details
   * to the database and store
   *
   * @param {User} $event
   * @memberof UserBioDataFormPageBase
   */
  saveBiodata($event: User) {
    this.remapEvent$($event).subscribe((user: User) => {
      this.user.add(user);
    });
  }

  /**
   * retrieves the user detials from the store
   * and changes the route when it's save
   *
   * @returns
   * @memberof UserBioDataFormPageBase
   */
  onValue() {
    return this.user.entities$
      .pipe(map(users => users[0]))
      .subscribe(this.changeRoute.bind(this));
  }

  /**
   * Listens for the error from User entity
   *
   * @returns
   * @memberof UserBioDataFormPageBase
   */
  onErrors() {
    return this.user.errors$
      .pipe(map(e => e.payload))
      .subscribe(this.displayError.bind(this));
  }

  /**
   * listen to the observable to setup the view
   *
   * @returns
   * @memberof UserBioDataFormPageBase
   */
  schoolDetails() {
    return this.store
      .select(schoolFeature)
      .pipe(map(this.selectView))
      .subscribe(v => {
        this.view$.next(v);
      }, this.displayError.bind(this));
  }

  /** app view state for different school categories */
  selectView({ category }: School) {
    const view = this.util.schoolPreset(category || ('primary' as any));
    view.permisions = Object.keys(view.permisions);
    return view;
  }

  /**
   * setups and starts all store listener
   *
   * @memberof UserBioDataFormPageBase
   */
  storeListen() {
    this.localSubscription.push(
      this.onErrors(),
      this.onValue(),
      this.schoolDetails()
    );
  }

  /**
   * retireves the error and displays it to the view
   *
   * @param {RxError} err
   * @memberof UserBioDataFormPageBase
   */
  displayError(err: RxError | Error) {
    this.err$.next(err.message);
    setTimeout(() => {
      this.err$.next(null);
    }, 3000);
  }

  /**
   * changes the route to the finished route page
   *
   * @param {User} user
   * @memberof UserBioDataFormPageBase
   */
  changeRoute(user: User) {
    if (user) {
      this.route.navigate(['finished']);
    }
  }

  ngOnInit() {
    this.user.clearCache();
    this.storeListen();
  }

  /**
   * destroy sthe subscriptions
   *
   * @memberof UserBioDataFormPageBase
   */
  ngOnDestroy() {
    this.localSubscription.forEach(e => e.unsubscribe());
  }
}
