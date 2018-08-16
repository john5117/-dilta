import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import {
  BusarActionTypes,
  BusarDelete,
  BusarLoad,
  BusarPreset,
  BusarReset,
  BusarSave,
  BusarUpdate
} from './busar.actions';
import { Settings, Setting } from '@dilta/models';
import {
  SchoolDBService,
  SettingDBService
} from '@dilta/offlinedatabase/src/lib/database.service';
import { InitalBusaryPreset, SettingTypes } from '@dilta/presets';
import { processFeature, SettingsEffects } from '@dilta/process';
import { Actions, Effect } from '@ngrx/effects';
import { createFeatureSelector, Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  tap,
  debounce,
  debounceTime,
  skipWhile
} from 'rxjs/operators';
import { SchoolDataService, SettingDataService } from '@dilta/store';
import { isNil } from 'lodash';

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
      this.setting.retrieve$({
        type: SettingTypes.school,
        owner: e.payload,
        school: e.payload
      })
    ),
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
      exhaustMap(action => this.school.delete$({ id: action.payload })),
      map(d => new BusarReset())
    );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    public setting: SettingDBService,
    private school: SchoolDBService,
    private globalSettings: SettingsEffects
  ) {}

  /**
   * setups presets for the busary applications
   *
   * @memberof SettingsEffects
   */
  presetBusary$() {
    return this.store
      .select(processFeature)
      .pipe(
        exhaustMap(({ schoolData }) =>
          this.school.retrieve$({ id: schoolData.schoolId })
        ),
        map(school => InitalBusaryPreset(school.category, school.id)),
        tap(e => console.log({ e }))
      );
  }

  /**
   * Loads the application settings
   *
   * @returns
   * @memberof BusaryEffects
   */
  loadBusarySettings() {
    return this.store.select(processFeature).subscribe(e => {
      if (e.schoolData) {
        this.store.dispatch(new BusarLoad(e.schoolData.schoolId));
      }
    });
  }

  /**
   * checks for the necessary busarys and application settings  when application is loaded
   *
   * @memberof SettingsEffects
   */
  checkBusarySettings() {
    this.globalSettings.defaultLoadings();
    this.loadBusarySettings();
  }
}

/** error throw if school busary not found */
export const BusarySettingsNotFound = new Error(
  `School Busary Settings Not Found`
);
