import { BusarActions, BusarActionTypes } from './busar.actions';

/**
 * siderBarInput Menu Type
 */
export type SettingState = { [p in keyof any]: SettingPreference };

/**
 * Interface of the SettingState
 *
 * @export
 * @interface SettingPreference
 */
export interface SettingPreference {
  /**
   * that url is clickable
   *
   * @type {boolean}
   * @memberof SettingPreference
   */
  enabled?: boolean;
  /**
   * nested Submenus
   *
   * @type {SettingState<any>}
   * @memberof SettingPreference
   */
  submenus?: SettingState;
  /**
   * Url Link to route to
   *
   * @type {string}
   * @memberof SettingPreference
   */
  link?: string;
  /**
   * name of the current menu
   *
   * @type {string}
   * @memberof SettingPreference
   */
  name: string;

  /**
   * Inputs to be added to child view
   *
   * @type {{
   *     addClasses: boolean
   *     values: { [k in keyof any ]: string }[];
   *   }}
   * @memberof SettingPreference
   */
  inputs?: { [k in keyof any]: string }[];
}

export const initialState: SettingState = {

};

export function reducer(state = initialState, action: BusarActions): SettingState {
  switch (action.type) {

    case BusarActionTypes.Save:
      return { ...state, ...action.payload };
    case BusarActionTypes.Reset:
      return initialState;
    default:
      return state;
  }
}
