import { Injectable } from '@angular/core';
import { ProcessEffectBase } from '@dilta/abstract-imp';
import * as IpcEvents from '@dilta/electron/src/lib/main/constants.ipc';
import * as StoreActions from '@dilta/process/src/process.ngrx/process.actions';
import { SchoolEncryptedData } from '@dilta/security';
import { UtilService } from '@dilta/util';
import { Actions, Effect } from '@ngrx/effects';
import { IpcRenderer } from 'electron';
import { ElectronService } from 'ngx-electron';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

// destructuring and mapping out customType
const { ProcessStoreEvents } = StoreActions;

/** Error thrown for using the service in an application that is not electron */
export const NotElectronError = new Error(`ProcessService implemented
 is only available for electron Application`);

@Injectable()
export class ProcessEffectService implements ProcessEffectBase {
  /**
   * Effects to trigger while retrieving liensce key
   *
   * @memberof ProcessService
   */
  @Effect()
  getliensceKey$ = this.actions$
    .ofType<StoreActions.GetLiensceKey>(ProcessStoreEvents.GET_LIENSCE_KEY)
    .pipe(
      tap(() => this.ipcEmit(IpcEvents.GET_LIENSCE_KEY)),
      switchMap(() => this.onIpc$(IpcEvents.RETRIEVED_LIENSCE_kEY)),
      map((res: [Error, SchoolEncryptedData]) => this.util.cleanErrorValue(res)),
      map(res => new StoreActions.VerifiedLiensceKeySuccess(res)),
      catchError((e: Error) => of(new StoreActions.LiensceKeyError(e)))
    );
  /**
   * Effects for deleting the liensce key for electron application
   *
   * @memberof ProcessService
   */
  @Effect()
  deleteliensceKey$ = this.actions$
    .ofType<StoreActions.DelLiensceKey>(ProcessStoreEvents.DELETE_LIENSCE_KEY)
    .pipe(
      tap(() => this.ipcEmit(IpcEvents.DELETE_LIENSCE_KEY)),
      switchMap(() => this.onIpc$(IpcEvents.DELETED_LIENSCE_KEY)),
      map((res: [Error, boolean]) => this.util.cleanErrorValue(res)),
      map(() => new StoreActions.VerifiedLiensceKeySuccess({} as any)),
      catchError((e: Error) => of(new StoreActions.LiensceKeyError(e)))
    );

  /**
   * Effects Triggered for updating the liensce key
   *
   * @memberof ProcessService
   */
  @Effect()
  updateliensceKey$ = this.actions$
    .ofType<StoreActions.UpdateLiensceKey>(
      ProcessStoreEvents.UPDATE_LIENSCE_KEY
    )
    .pipe(
      tap(action => this.ipcEmit(IpcEvents.SET_LIENSCE_KEY, action.payload)),
      switchMap(() => this.onIpc$<SchoolEncryptedData>(IpcEvents.SAVED_LIENSCE_KEY)),
      map((res) => this.util.cleanErrorValue(res)),
      map(res => new StoreActions.VerifiedLiensceKeySuccess(res)),
      catchError((err: Error) => of(new StoreActions.LiensceKeyError(err)))
    );

  /**
   * Effects Triggered for updating the schoolId
   *
   * @memberof ProcessService
   */
  @Effect()
  getSchoolId$ = this.actions$
    .ofType<StoreActions.GetSchoolId>(ProcessStoreEvents.GET_LIENSCE_KEY)
    .pipe(
      tap(() => this.ipcEmit(IpcEvents.GET_SCHOOL_ID)),
      switchMap(() => this.onIpc$(IpcEvents.RETRIEVED_SCHOOL_ID).pipe()),
      map((res: [Error, string]) => this.util.cleanErrorValue(res)),
      map(res => new StoreActions.SaveSchoolId(res)),
      catchError(err => of(new StoreActions.SchoolIdError(err)))
    );

  /**
   * Effects Triggered for deleting the schoolId
   *
   * @memberof ProcessService
   */
  @Effect()
  deleteSchoolId$ = this.actions$
    .ofType<StoreActions.DelSchoolId>(ProcessStoreEvents.DELETE_SCHOOL_ID)
    .pipe(
      tap(action => this.ipcEmit(IpcEvents.DELETED_SCHOOL_ID)),
      switchMap(() => this.onIpc$(IpcEvents.DELETED_SCHOOL_ID)),
      map((res: [Error, boolean]) => this.util.cleanErrorValue(res)),
      map(() => new StoreActions.SaveSchoolId(undefined)),
      catchError((err: Error) => of(new StoreActions.SchoolIdError(err)))
    );

  /**
   * Effetcs Triggered for updating the schoolId
   *
   * @memberof ProcessService
   */
  @Effect()
  updateSchoolId$ = this.actions$
    .ofType<StoreActions.UpdateSchoolId>(ProcessStoreEvents.UPDATE_SCHOOL_ID)
    .pipe(
      tap(action => this.ipcEmit(IpcEvents.SET_SCHOOL_ID, action.payload)),
      switchMap(() => this.onIpc$(IpcEvents.SAVED_SCHOOL_ID)),
      map((res: [Error, string]) => this.util.cleanErrorValue(res)),
      map(res => new StoreActions.SaveSchoolId(res)),
      catchError((err: Error) => of(new StoreActions.SchoolIdError(err)))
    );

  /**
   * Effects Triggered for liensce key verification
   *
   * @memberof ProcessEffectService
   */
  @Effect()
  verifyLiensceKey$ = this.actions$
    .ofType<StoreActions.VerifyLiensceKey>(ProcessStoreEvents.VERITY_LIENSCE_KEY)
    .pipe(
      tap(action => this.decryptLiensceKey(action.payload)),
      switchMap(() => this.onDecryptLiensceKey),
      tap(console.log),
      map((school: SchoolEncryptedData) => new StoreActions.UpdateLiensceKey(school)),
      catchError((err: Error) => of(new StoreActions.VerifyLiensceKeyFailure(err)))
    );

  /**
   * Creates an instance of ProcessService. and
   * check if it is electron application
   */
  constructor(
    private electron: ElectronService,
    private actions$: Actions,
    private util: UtilService
  ) {
    if (!this.electron.isElectronApp) {
      throw NotElectronError;
    }
  }

  /**
   * custom function for the ipc to listen on event
   *
   * @param {string} event
   * @returns
   * @memberof ProcessService
   */
  onIpc$<T>(event: string) {
    const promise: Promise<[Error, T]> = new Promise((resolve ) => {
      this.electron.ipcRenderer.on(event, (sender: IpcRenderer, response) => {
        console.log({ response });
        resolve(response);
      });
    });
    return fromPromise(promise);
  }

  /**
   *  custom func to emit actions for the icp
   *
   * @param {string} eventName
   * @returns
   * @memberof ProcessService
   */
  ipcEmit<T>(eventName: string, payload?: T) {
    return this.electron.ipcRenderer.send(eventName, payload);
  }

  /**
   * the method that sends the liensce key file content to the main process
   * for decryption.
   *
   * @param {string} token
   * @memberof ProcessService
   */
  decryptLiensceKey(token: string) {
    this.ipcEmit(IpcEvents.VERIFY_LIENSCE_KEY_FILE, { token });
  }

  /**
   * Event listener for the decrypted token response from the main process
   *
   * @readonly
   * @memberof ProcessService
   */
  get onDecryptLiensceKey() {
    return this.onIpc$(IpcEvents.VERIFYED_LIENSCE_KEY_FILE).pipe(
      tap(res => console.log(res)),
      map((res: [Error, SchoolEncryptedData]) =>
        this.util.cleanErrorValue(res)
      ),
      map(res => {
        if (!res) {
          throw invalidLiensceKeyPassed;
        }
        return res;
      })
    );
  }
}

export const invalidLiensceKeyPassed = new Error(
  `Invalid Liensce Passed to the Program, contact the service operator or get a new liensce key`
);
