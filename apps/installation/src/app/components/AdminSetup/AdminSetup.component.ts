import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Manager } from '@dilta/commonwebui';
import { ManagerService } from '@dilta/store';
import { UtilService } from '@dilta/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';


/**
 * this components provides ui for setting up the
 * school managers
 *
 * @export
 * @class AdminSetupComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-admin-setup',
  templateUrl: './AdminSetup.component.html',
  styleUrls: ['./AdminSetup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSetupComponent implements OnInit, OnDestroy {
  /**
   * err displayed to the component view
   *
   * @private
   * @type {string}
   * @memberof AdminSetupComponent
   */
  public err$ = new BehaviorSubject(undefined);

  public schoolId: string;

  public localSubscription: Subscription[] = [];

  constructor(
    private _router: Router,
    private _actR: ActivatedRoute,
    private util: UtilService,
    private manager: ManagerService
  ) {}

  /**
   * saves the managers info into the database
   *
   * @param {Manager} $event triggerd from sub-component view
   * @memberof AdminSetupComponent
   */
  saveManagers($event: Manager) {
    this.manager.add({
      ...$event,
      id: this.schoolId,
      school: this.schoolId
    });
  }

  /**
   * Sets up various Listeners for various events
   *
   * @memberof AdminSetupComponent
   */
  listener() {
    this.localSubscription.push(this.onError(), this.onValue());
  }

  /**
   * destroy all the subscriptions the listener is listen to
   *
   * @memberof AdminSetupComponent
   */
  destroyListeners() {
    this.localSubscription.forEach(e => e.unsubscribe());
    this.err$.unsubscribe();
  }

  /**
   * listens for error from the managers entity
   *
   * @memberof AdminSetupComponent
   */
  onError() {
    return this.manager.errors$
      .pipe(map(e => e.payload.error))
      .subscribe(this.displayError.bind(this));
  }

  /**
   * display the error to the observable
   *
   * @param {Error} e
   * @memberof AdminSetupComponent
   */
  displayError(e: Error) {
    this.err$.next(e.message);
    setTimeout(() => {
      this.err$.next(undefined);
    }, 3000);
  }

  /**
   * listens  for a valid value for the manager
   *
   * @memberof AdminSetupComponent
   */
  onValue() {
    return this.manager.entities$
    .pipe(map(m => m[0]))
    .subscribe(this.changeRoute.bind(this));
  }

  /**
   * changes the route to the next page
   *
   * @memberof AdminSetupComponent
   */
  changeRoute(manager?: Manager) {
    if (manager) {
      this._router.navigate(['signup', manager.school]);
    }
  }

  ngOnInit() {
    this.schoolId = this._actR.snapshot.params['id'];
    this.listener();
  }

  /**
   * destroys all subscriptions
   *
   * @memberof AdminSetupComponent
   */
  ngOnDestroy() {
    this.destroyListeners();
  }
}
