import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { BusarActionTypes } from './busar.actions';

@Injectable()
export class BusaryEffects {

  @Effect()
  loadBusar$ = this.actions$.ofType(BusarActionTypes.Load);

  @Effect()
  updateBusar$ = this.actions$.ofType(BusarActionTypes.Update);

  @Effect()
  deleteBusar$ = this.actions$.ofType(BusarActionTypes.Delete);

  constructor(private actions$: Actions) {}
}
