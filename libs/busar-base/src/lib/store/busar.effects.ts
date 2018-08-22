import { Injectable } from '@angular/core';
import { DreamSettingService, schoolFeature } from '@dilta/common-ui/src';
import { Setting } from '@dilta/models';
import { InitalBusaryPreset, SettingTypes } from '@dilta/presets';
import { Actions, Effect } from '@ngrx/effects';
import { createFeatureSelector, Store } from '@ngrx/store';
import { isNil } from 'lodash';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, skipWhile, tap } from 'rxjs/operators';
import {
  BusarActionTypes,
  BusarDelete,
  BusarLoad,
  BusarPreset,
  BusarReset,
  BusarSave,
  BusarUpdate
} from './busar.actions';

export const BusaryStoreFeatureName = 'busary';
export const BusarFeature = createFeatureSelector<Setting>(
  BusaryStoreFeatureName
);

@Injectable()
export class BusaryEffects {
  /**
   * Effects to load busar settings
   *
   * @memberof BusaryEffects
   */
  @Effect()
  loadBusary$ = this.actions$.ofType<BusarLoad>(BusarActionTypes.Load).pipe(
    skipWhile(action => isNil(action.payload)),
    exhaustMap(e =>
      this.setting.find$({
        type: SettingTypes.school,
        owner: e.payload,
        school: e.payload
      })
    ),
    map(([setting]) => setting),
    map(setting => {
      if (setting) {
        return setting;
      }
      throw BusarySettingsNotFound;
    }),
    map(setting => new BusarSave(setting)),
    catchError(e => {
      console.log({ error: e });
      return of(new BusarPreset());
    })
  );

  /**
   * Observable Effects to detect and save new Busary Preset Streams
   *
   * @memberof BusaryEffects
   */
  @Effect()
  preset$ = this.actions$
    .ofType(BusarActionTypes.Preset)
    .pipe(
      exhaustMap(() => this.presetBusary$()),
      map(school => new BusarUpdate(school))
    );

  /**
   * Effect Stream to update and save the busary to the database
   *
   * @memberof BusaryEffects
   */
  @Effect()
  saveBusary$ = this.actions$
    .ofType<BusarUpdate>(BusarActionTypes.Update)
    .pipe(
      exhaustMap(action => this.setting.update$(action.payload)),
      map(setting => new BusarSave(setting))
    );

  /**
   * Effect Delete Busar Settings and also Reset
   *
   * @memberof BusaryEffects
   */
  @Effect()
  deleteBusary$ = this.actions$
    .ofType<BusarDelete>(BusarActionTypes.Delete)
    .pipe(
      exhaustMap(action => this.setting.delete$(action.payload)),
      map(d => new BusarReset())
    );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    public setting: DreamSettingService
  ) {}

  /**
   * setups presets for the busary applications
   *
   * @memberof SettingsEffects
   */
  presetBusary$() {
    return this.store
      .select(schoolFeature)
      .pipe(
        exhaustMap(({ id }) => this.setting.find$({ owner: id, school: id })),
        map(([school]) => school),
        map(school => InitalBusaryPreset(school.type as any, school.id)),
        tap(e => console.log({ e }))
      );
  }
}

/** error throw if school busary not found */
export const BusarySettingsNotFound = new Error(
  `School Busary Settings Not Found`
);
