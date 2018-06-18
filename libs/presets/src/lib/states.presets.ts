/**
 * osun state details for the nigerian states json
 *
 * @export
 * @interface Nigeria
 */
export interface Nigeria {
  State: State;
  Adamawa: State;
  'Akwa Ibom': State;
  Anambra: State;
  Bauchi: State;
  Benue: State;
  'Cross River': State;
  Enugu: State;
  Edo: State;
  Delta: State;
  Borno: State;
  Ekiti: State;
  Lagos: State;
  Kebbi: State;
  'Federal Capital Territory': Cities;
  Niger: State;
  Katsina: State;
  Oyo: State;
  Jigawa: State;
  Ebonyi: State;
  Nasarawa: State;
  Plateau: State;
  Gombe: State;
  Kaduna: State;
  Kano: State;
  Ondo: State;
  Osun: State;
  Taraba: State;
  Bayelsa: State;
  Yobe: State;
  Sokoto: State;
  Kogi: State;
  Ogun: State;
  Kwara: State;
  Imo: State;
  Zamfara: State;
}

/**
 * a nigerian state interface
 *
 * @export
 * @interface State
 */
export interface State {
  minLat: number;
  name: string;
  capital: string;
  latitude: number;
  minLong: number;
  maxLat: number;
  longitude: number;
  maxLong: number;
  alias: string;
  cities: Cities | string[];
  lgas: string[];
}

/**
 * interface for a nigeria cities
 *
 * @export
 * @interface Cities
 */
export interface Cities {
  message: string;
  status: number;
}

/** importing the nigerian state */
// export const NigeriaPreset: Nigeria = require('./nigeria.states.json');
export * from './nigeria.states';
