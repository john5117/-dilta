import { SchoolEncryptedData } from '@dilta/security';
import { createFeatureSelector } from '@ngrx/store';
import { ProcessStoreActions, ProcessStoreEvents } from './process.actions';


/** Process Feature Name */
export const ProcessFeatureName = 'process';
/** feature selector for selecting process state section fro the store */
export const processFeature = createFeatureSelector<ProcessState>(
  ProcessFeatureName
);

export interface ProcessState {
  apikey: string;
  schoolId: string;
  schoolData: SchoolEncryptedData;
  error: Error;
}

export const coreInitialState: ProcessState = {
  apikey: null,
  schoolId: null,
  schoolData: null,
  error: undefined
};

export function ProcessStoreEventsReducer(
  state = coreInitialState,
  action: ProcessStoreActions
): ProcessState {
  switch (action.type) {
    case ProcessStoreEvents.LIENSCE_KEY_ERROR:
    case ProcessStoreEvents.SCHOOL_ID_KEY_ERROR:
    case ProcessStoreEvents.VERIFIED_LIENSCE_KEY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ProcessStoreEvents.SAVE_APIKEY_KEY:
      return {
        ...state,
        apikey: action.payload,
        error: undefined
      };
    case ProcessStoreEvents.SAVE_SCHOOL_ID:
      return {
        ...state,
        schoolId: action.payload,
        error: undefined
      };
    case ProcessStoreEvents.VERIFIED_LIENSCE_KEY_SUCCESS:
      return {
        ...state,
        apikey: action.payload.apikey,
        schoolId: action.payload.schoolId,
        schoolData: action.payload,
        error: undefined
      };
    case ProcessStoreEvents.RETRIEVE_SCHOOL_ID:
    case ProcessStoreEvents.RETRIEVE_APIKEY_KEY:
      return state;
    default:
      return state;
  }
}
