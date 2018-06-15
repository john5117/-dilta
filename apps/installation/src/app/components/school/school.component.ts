import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from '@dilta/commonwebui';
import { SchoolService } from '@dilta/store';
import { UtilService } from '@dilta/util';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

const ErrorDisplayTimeOut = 4000;

/**
 * ui for setting up school biodata
 *
 * @export
 * @class SchoolComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchoolComponent implements OnInit {
  /**
   * error displayed to the view.
   *
   * @private
   * @type {string}
   * @memberof SchoolComponent
   */
  public err: string;

  public schoolId: string;

  public localSubscriptions: Subscription[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private util: UtilService,
    private school: SchoolService
  ) {}

  /**
   * triggers when the form is submitted for saving in the database
   *
   * @param {Partial<School>} $event
   * @memberof SchoolComponent
   */
  onSubmit($event: School | Partial<School>) {
    this.school.add({ ...$event, id: this.schoolId } as School);
  }

  /**
   * listen for the store for school creation
   *
   * @memberof SchoolComponent
   */
  listenStore() {
    this.localSubscriptions.push(this.onError(), this.onValue());
  }

  /**
   * Listens for error from the school entity
   *
   * @returns
   * @memberof SchoolComponent
   */
  onError() {
    return this.school.errors$
      .pipe(map(e => e.payload.error))
      .subscribe(this.displayErr.bind(this));
  }
  /**
   * displays the error to the view
   *
   * @param {Error} err
   * @memberof SchoolComponent
   */
  displayErr(err: Error) {
    this.err = err.message;
    setTimeout(() => {
      this.err = undefined;
    }, ErrorDisplayTimeOut);
  }

  /**
   * listen for value emission
   *
   * @returns
   * @memberof SchoolComponent
   */
  onValue() {
    return this.school.entities$.map(e => e[0]).subscribe(val => {
      if (val) {
        this.changeRoute(val.id);
      }
    });
  }

  /**
   * changes the route to the admin page for setup
   *
   * @param {string} globalId unique id particular to the school alone
   * @returns
   * @memberof SchoolComponent
   */
  changeRoute(globalId: string) {
    if (!globalId) {
      return;
    }
    console.log('changing route', globalId);
    this.route.navigate(['admin', globalId]);
  }

  ngOnInit() {
    this.schoolId = this.actRoute.snapshot.params['id'];
    this.listenStore();
  }
}
