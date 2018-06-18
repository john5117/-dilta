import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '@dilta/commonwebui';
import { User } from '@dilta/models';
import { SchoolDict, SchoolPreset } from '@dilta/presets';
import { processFeature } from '@dilta/process';
import { SchoolService, UserService } from '@dilta/store';
import { UtilService } from '@dilta/util';
import { Store } from '@ngrx/store';
import { pick } from 'lodash';
import { RxError } from 'rxdb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { combineLatest, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-biodata',
  templateUrl: './admin-biodata.component.html',
  styleUrls: ['./admin-biodata.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminBiodataComponent implements OnInit, OnDestroy {
  /**
   * required keys for the database
   *
   * @static
   * @memberof AdminBiodataComponent
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
   * @memberof AdminBiodataComponent
   */
  private school$: Observable<SchoolDict>;

  private localSubscription: Subscription[] = [];

  /**
   * err displayed to the view
   *
   * @private
   * @type {string}
   * @memberof AdminBiodataComponent
   */
  public err$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  /**
   * array containing classes
   *
   * @private
   * @type {string[]}
   * @memberof AdminBiodataComponent
   */
  public classes$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  /**
   * array containing subjects
   *
   * @private
   * @type {string[]}
   * @memberof AdminBiodataComponent
   */
  public subjects$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  /**
   * array containing levels
   *
   * @private
   * @type {string[]}
   * @memberof AdminBiodataComponent
   */
  public levels$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(
    private _actR: ActivatedRoute,
    private route: Router,
    private util: UtilService,
    private admin: UserService,
    private school: SchoolService,
    private store: Store<any>
  ) {}

  /**
   * remaps the event by changing it properities to
   * valid object for the database
   *
   * @param {*} $event
   * @returns
   * @memberof AdminBiodataComponent
   */
  remapEvent$($event: any) {
    const event$ = of($event);
    const authId$ = this._actR.queryParams.pipe(
      map(params => params['id'] as string)
    );
    const schoolId$ = this.store
      .select(processFeature)
      .pipe(map(process => process.schoolId));
    return event$.pipe(combineLatest(authId$, schoolId$), map(this.remap));
  }

  /**
   * changes the event to the standard user event
   *
   * @param {[any, string, string]} [event, schoolId, authId]
   * @returns
   * @memberof AdminBiodataComponent
   */
  remap([event, schoolId, authId]: [any, string, string]) {
    event['class'] = event.classInCh;
    event['subject'] = event.subjectICh;
    event['authId'] = authId;
    event['id'] = this.util.randomuuid();
    event['school'] = schoolId;
    return pick(event, AdminBiodataComponent.requiredKeys) as User;
  }

  /**
   * dispatch an action to save the school biodata details
   * to the database and store
   *
   * @param {Admin} $event
   * @memberof AdminBiodataComponent
   */
  saveBiodata($event: Admin) {
    this.remapEvent$($event).subscribe(user => {
      this.admin.add(user);
    });
  }

  /**
   * setups the view properties from complex json structure
   *
   * @param {keyof SchoolPreset} [school='primary']
   * @memberof AdminBiodataComponent
   */
  setupView(school: SchoolDict) {
    this.classes$.next(school.classes);
    this.levels$.next(Object.keys(school.permisions));
    this.subjects$.next(school.subjects);
  }

  /**
   * retrieves the user detials from the store
   * and changes the route when it's save
   *
   * @returns
   * @memberof AdminBiodataComponent
   */
  onValue() {
    return this.admin.entities$
      .pipe(map(users => users[0]))
      .subscribe(this.changeRoute.bind(this));
  }

  /**
   * Listens for the error from admin entity
   *
   * @returns
   * @memberof AdminBiodataComponent
   */
  onErrors() {
    return this.admin.errors$
      .pipe(map(e => e.payload))
      .subscribe(this.displayError.bind(this));
  }

  /**
   * listen to the observable to setup the view
   *
   * @returns
   * @memberof AdminBiodataComponent
   */
  schoolDetails() {
    return this.school.entities$
      .pipe(map(schools => this.util.schoolPreset(schools[0].category || 'primary' as any) ))
      .subscribe(this.setupView.bind(this), this.displayError.bind(this));
  }

  /**
   * setups and starts all store listener
   *
   * @memberof AdminBiodataComponent
   */
  storeListen() {
    this.localSubscription.push(this.onErrors(), this.onValue(), this.schoolDetails());
  }

  /**
   * retireves the error and displays it to the view
   *
   * @param {RxError} err
   * @memberof AdminBiodataComponent
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
   * @memberof AdminBiodataComponent
   */
  changeRoute(user: User) {
    if (user) {
      this.route.navigate(['finished']);
    }
  }

  ngOnInit() {
    this.storeListen();
  }

  /**
   * destroy sthe subscriptions
   *
   * @memberof AdminBiodataComponent
   */
  ngOnDestroy() {
    this.localSubscription.forEach(e => e.unsubscribe());
  }
}
