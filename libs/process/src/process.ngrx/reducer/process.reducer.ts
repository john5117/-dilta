import { ProcessStoreActions, ProcessStoreEvents } from '../actions';
import { SchoolEncryptedData } from '@dilta/security';

export interface ProcessState {
  apikey: string;
  schoolId: string;
  schoolData: SchoolEncryptedData;
  error: string;
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
        error: action.payload.message
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
