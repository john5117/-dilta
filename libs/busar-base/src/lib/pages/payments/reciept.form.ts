import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { receipt } from '@dilta/generator';
import { Receipt } from '@dilta/models';
import { ReceiptService, SchoolService } from '@dilta/store';
import { Store } from '@ngrx/store';
import { isNil, last } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  exhaustMap,
  first,
  map,
  skipWhile,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { BusarFeature } from '../../store';
import { BusarPaymentBase } from './payments.form';

function paymentOptions(state: any, key: string) {
  if (
    !BusarFeature(state).settings ||
    !BusarFeature(state).settings[key] ||
    !BusarFeature(state).settings[key].submenus
  ) {
    return [];
  }
  return Object.keys(BusarFeature(state).settings[key].submenus);
}

export class BusarRecieptFormPageBase extends BusarPaymentBase
  implements OnInit {
  /**
   * obersable of reciept object passed to the view
   *
   * @type {(Observable<Receipt | null | {}>)}
   * @memberof BusarRecieptFormPageBase
   */
  reciept$: Observable<Receipt | null | {}> = of(null);

  paymentOptions$: Observable<string[]> = of([]);

  /**
   * listen to the event to save the reciept
   *
   * @memberof BusarRecieptFormPageBase
   */
  onReciept$ = new BehaviorSubject<Receipt>(null);

  constructor(
    public school: SchoolService,
    public store: Store<any>,
    public route: ActivatedRoute,
    public router: Router,
    public reciptSvc: ReceiptService
  ) {
    super(store, school);
  }

  /**
   * changes the observer to the route observer
   *
   * @memberof BusarRecieptFormPageBase
   */
  observeReciept() {
    this.reciept$.pipe(
      exhaustMap(e => this.route.queryParams),
      map(querys => {
        if (querys === {} || querys === null) {
          return null;
        }
        return querys;
      }),
      skipWhile(isNil)
    );
  }

  /**
   * changes route if the reciept has been saved
   *
   * @memberof BusarRecieptFormPageBase
   */
  changeRoute() {
    this.onReciept$
      .pipe(
        skipWhile(isNil),
        withLatestFrom(this.reciptSvc.keys$),
        tap(console.log),
        map(([reciept, ids]) => (last(ids) !== reciept.id ? receipt : null)),
        skipWhile(isNil),
        first()
      )
      .subscribe((reciept: Receipt) =>
        this.router.navigate(['busar', 'reciept', reciept.id])
      );
  }

  onError() {
    this.reciptSvc.errors$.subscribe(error => {
      console.log(error);
    });
  }

  /**
   * save reciept to the database
   *
   * @memberof BusarRecieptFormPageBase
   */
  listenReciept() {
    this.onReciept$
      .pipe(skipWhile(isNil), first())
      .subscribe((reciept: Receipt) => this.reciptSvc.add(reciept));
  }

  ngOnInit() {
    super.ngOnInit();
    console.log(this.store);
    this.paymentOptions$ = this.store.pipe(
      map(state => paymentOptions(state, 'revenue'))
    );
    this.observeReciept();
    this.changeRoute();
  }
}
