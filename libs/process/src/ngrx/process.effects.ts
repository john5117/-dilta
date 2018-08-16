import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetLiensceKey } from '@dilta/process/src/ngrx/process.actions';
import {
  processFeature,
  ProcessState
} from '@dilta/process/src/ngrx/process.reducer';
import { Actions } from '@ngrx/effects';
import {
  VerifiedLiensceKeySuccess,
  ProcessStoreEvents
} from './process.actions';
import { take, tap, skipWhile } from 'rxjs/operators';
import { SchoolService } from '@dilta/store';
import { isNil } from 'lodash';
import { autobind } from 'core-decorators';
import { SchoolEncryptedData } from '@dilta/security';

/**
 *  User Settings Effects.
 *
 * @class SettingsEffects
 */
@Injectable()
export class SettingsEffects {
  constructor(
    private store: Store<any>,
    private action$: Actions,
    private school: SchoolService
  ) {}

  /**
   * Checks if the school Biodata is registered or unavailable
   *
   * @returns
   * @memberof SettingsEffects
   */
  checkSchoolDetailsSettings() {
    return this.store.select(processFeature).subscribe(e => {
      console.log(e);
      // this.store.dispatch(new BusarLoad(e.schoolId));
    });
  }

  /**
   * global settings to be called in every application
   *
   * @returns {*}
   * @memberof SettingsEffects
   */
  defaultLoadings(): void {
    this.retieveLienseValid();
    this.loadSchoolBiodataFromDb();
  }

  /**
   * dispatches action to check if the school liensce is valid
   *
   * @memberof SettingsEffects
   */
  retieveLienseValid() {
    this.store.dispatch(new GetLiensceKey());
  }

  /**
   * Dispatch action to SchoolBiodata From store load
   *
   * @memberof SettingsEffects
   */
  loadSchoolBiodataFromDb() {
    this.store
      .select(processFeature)
      .pipe(skipWhile(process => isNil(process.schoolData)), take(1))
      .subscribe(this.getSchoolDb);
  }

  /**
   * dispatches action to load school details
   *
   * @param {ProcessState} process
   * @memberof SettingsEffects
   */
  @autobind()
  getSchoolDb(process: ProcessState) {
    this.school.getByKey(process.schoolData.schoolId);
  }
}
