import { Setting } from '@dilta/models';
import { Action } from '@ngrx/store';

export enum BusarActionTypes {
  Load = '[Busar] Load Busar',
  Save = '[Busar] Save Busar',
  Update = '[Busar] Update Busar',
  Delete = '[Busar] Delete Busar',
  Reset = '[Busar] Reset Busar',
  Preset = '[Busar] Preset Setting'
}

/**
 * Action dispatch to get and load the Busarys Setting from db
 *
 * @export
 * @class BusarLoad
 * @implements {Action}
 */
export class BusarLoad implements Action {
  readonly type = BusarActionTypes.Load;
  constructor(public payload: string) {}
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
  constructor(public payload: Setting) {}
}

/**
 * Action dispatched to update the busary Setting
 *
 * @export
 * @class BusarUpdate
 * @implements {Action}
 */
export class BusarUpdate implements Action {
  readonly type = BusarActionTypes.Update;
  constructor(public payload: Setting) {}
}

/**
 * Action dispatched to delete busar Setting
 *
 * @export
 * @class BusarDelete
 * @implements {Action}
 */
export class BusarDelete implements Action {
  readonly type = BusarActionTypes.Delete;
  constructor(public payload: string) {}
}

/**
 * Actions dispatched to reset busary Setting to inital state
 *
 * @export
 * @class BusarReset
 * @implements {Action}
 */
export class BusarReset implements Action {
  readonly type = BusarActionTypes.Reset;
}

/**
 * Action dispatched to load presets for Setting
 *
 * @export
 * @class SettingPreset
 * @implements {Action}
 */
export class BusarPreset implements Action {
  readonly type = BusarActionTypes.Preset;
}

export type BusarActions =
  | BusarLoad
  | BusarSave
  | BusarUpdate
  | BusarDelete
  | BusarPreset
  | BusarReset;


/**
 * Setting Action Types
 *
 * @export
 * @enum {number}
 */
export enum SettingActionTypes {
  Load = '[Setting] Load Setting',
  Save = '[Setting] Save Setting',
  // Update = '[Setting] Update Setting',
  Delete = '[Setting] Delete Setting',
  Reset = '[Setting] Reset Setting',
}


/**
 * Action dispacthed to load Setting
 *
 * @export
 * @class Setting
 * @implements {Action}
 */
export class SettingLoad implements Action {
  readonly type = SettingActionTypes.Load;
  constructor(public payload: Setting) {}
}

/**
 * Action dispatched to save Setting.
 *
 * @export
 * @class Settingave
 * @implements {Action}
 */
export class Settingave implements Action {
  readonly type = SettingActionTypes.Save;
  constructor(public payload: Setting) {}
}


/**
 * Actions dipatched to delete Setting
 *
 * @export
 * @class SettingDelete
 * @implements {Action}
 */
export class SettingDelete implements Action {
  readonly type = SettingActionTypes.Delete;
  constructor(public payload: Setting) {}
}


/**
 * Action to dispathed to reset local setting state
 *
 * @export
 * @class SettingReset
 * @implements {Action}
 */
export class SettingReset implements Action {
  readonly type = SettingActionTypes.Reset;
  constructor(public payload: Setting) {}
}
