import { Action } from '@ngrx/store';
import { SettingState } from './busar.reducer';

export enum BusarActionTypes {
  Load = '[Busar] Load Busar',
  Save = '[Busar] Save Busar',
  Update = '[Busar] Update Busar',
  Delete = '[Busar] Delete Busar',
  Reset = '[Busar] Reset Busar'
}


/**
 * Action dispatch to get and load the state from db
 *
 * @export
 * @class BusarLoad
 * @implements {Action}
 */
export class BusarLoad implements Action {
  readonly type = BusarActionTypes.Load;
}


/**
 * Save the payload to the store
 *
 * @export
 * @class BusarSave
 * @implements {Action}
 */
export class BusarSave implements Action {
  readonly type = BusarActionTypes.Save;
  constructor(public payload: SettingState) {}
}


/**
 * Action dispatched to update the busary settings
 *
 * @export
 * @class BusarUpdate
 * @implements {Action}
 */
export class BusarUpdate implements Action {
  readonly type = BusarActionTypes.Update;
  constructor(public payload: SettingState) {}
}

/**
 * Action dispatched to delete busar settings
 *
 * @export
 * @class BusarDelete
 * @implements {Action}
 */
export class BusarDelete implements Action {
  readonly type = BusarActionTypes.Delete;
}

/**
 * Actions dispatched to reset busary settings to inital state
 *
 * @export
 * @class BusarReset
 * @implements {Action}
 */
export class BusarReset implements Action {
  readonly type = BusarActionTypes.Reset;
}


export type BusarActions = BusarLoad | BusarSave | BusarUpdate | BusarDelete | BusarReset;
