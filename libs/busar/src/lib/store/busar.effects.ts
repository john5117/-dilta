import { Injectable } from '@angular/core';
import { Setting, Settings } from '@dilta/models';
import { SchoolDBService, SettingDBService } from '@dilta/offlinedatabase/src/lib/database.service';
import { InitalBusaryPreset } from '@dilta/presets';
import { processFeature } from '@dilta/process';
import { Actions, Effect } from '@ngrx/effects';
import { createFeatureSelector, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BusarActionTypes, BusarLoad, BusarPreset } from './busar.actions';

export const BusaryStoreFeatureName = 'busary';
export const BusarFeature = createFeatureSelector<Settings>(
  BusaryStoreFeatureName
);

export enum SettingTypes {
  school = 'school',
  user = 'user'
}

@Injectable()
export class BusaryEffects {
  /**
   * Effects to load busar settings
   *
   * @memberof BusaryEffects
   */
  @Effect()
  loadBusary$ = this.actions$.ofType<BusarLoad>(BusarActionTypes.Load).pipe(
    switchMap(e =>
      this.setting.find$({ type: SettingTypes.school, owner: e.payload })
    ),
    map(([setting]: Setting[]) => {
      console.log(setting);
      if (setting) {
        return setting;
      }
      throw BusarySettingsNotFound;
    }),
    catchError(e => of(new BusarPreset()))
  );

  // /**
  //  * Observable Effects to detect and save new Busary Preset Streams
  //  *
  //  * @memberof BusaryEffects
  //  */
  // @Effect()
  // preset$ = this.actions$
  //   .ofType(BusarActionTypes.Preset)
  //   .pipe(
  //     switchMap(() => this.presetBusary$()),
  //     map(school => new BusarUpdate(school as any))
  //   );

  // /**
  //  * Effect Stream to update and save the busary to the database
  //  *
  //  * @memberof BusaryEffects
  //  */
  // @Effect()
  // saveBusary$ = this.actions$
  //   .ofType<BusarUpdate>(BusarActionTypes.Update)
  //   .pipe(
  //     switchMap(action => this.setting.update$(action.payload)),
  //     map(setting => new BusarSave(setting))
  //   );

  // /**
  //  * Effect Delete Busar Settings and also Reset
  //  *
  //  * @memberof BusaryEffects
  //  */
  // @Effect()
  // deleteBusary$ = this.actions$
  //   .ofType<BusarDelete>(BusarActionTypes.Delete)
  //   .pipe(
  //     switchMap(action => this.school.delete$({ id: action.payload })),
  //     map(d => new BusarReset())
  //   );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    public setting: SettingDBService,
    private school: SchoolDBService
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
        switchMap(school => this.school.retrieve$({ id: school.schoolId })),
        map(school => InitalBusaryPreset(school.category, school.id))
      );
  }

  /**
   * checks for the busarysettings when application is loaded
   *
   * @memberof SettingsEffects
   */
  checkBusarySettings() {
    return this.store
      .select(processFeature)
      .subscribe(e => {
        console.log(e);
        this.store.dispatch(new BusarLoad(e.schoolId));
      });
  }
}

/** error throw if school busary not found */
export const BusarySettingsNotFound = new Error(
  `School Busary Settings Not Found`
);
