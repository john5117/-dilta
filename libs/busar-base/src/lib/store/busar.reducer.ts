import { Setting } from '@dilta/models';
import { BusarActions, BusarActionTypes } from './busar.actions';

export const initialState: Setting = {} as any;

export function reducer(state = initialState, action: BusarActions): Setting {
  switch (action.type) {
    case BusarActionTypes.Save:
      return { ...state, ...action.payload };
    case BusarActionTypes.Reset:
      return initialState;
    default:
      return state;
  }
}
