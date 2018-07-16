import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { processFeature } from './process.reducer';

/**
 *  User Settings Effects.
 *
 * @class SettingsEffects
 */
@Injectable()
class SettingsEffects {
  constructor(private store: Store<any>) {}

  /**
   * Checks if the school Biodata is registered or unavailable
   *
   * @returns
   * @memberof SettingsEffects
   */
  checkSchoolDetailsSettings() {
    return this.store
      .select(processFeature)
      .subscribe(e => {
        console.log(e);
        // this.store.dispatch(new BusarLoad(e.schoolId));
      });
  }

  /**
   * Dispatch action to SchoolBiodata From store load
   *
   * @memberof SettingsEffects
   */
  loadSchoolBiodataFromDb() {}
}
