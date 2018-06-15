import * as mfa from '@dilta/process/src/process.ngrx/actions/actions';
import {
  coreInitialState,
  ProcessState,
  ProcessStoreEventsReducer
} from './process.reducer';

describe('ProcessStoreEventsReducer:: responsibe for the store aspect of schoolID and apikey ', () => {
  it('should save apikey', () => {
    const apikey = 'myapikey';
    expect(
      ProcessStoreEventsReducer(coreInitialState, new mfa.SaveApiKey(apikey))
    ).toEqual(<ProcessState>{ apikey, schoolId: null });
  });

  it('should save schoolId', () => {
    const schoolId = 'myschoolId';
    expect(
      ProcessStoreEventsReducer(
        coreInitialState,
        new mfa.SaveSchoolId(schoolId)
      )
    ).toEqual(<ProcessState>{ apikey: null, schoolId });
  });

  it('should retreive the current state', () => {
    // retrieve school Id
    expect(
      ProcessStoreEventsReducer(coreInitialState, new mfa.RetrieveSchoolId())
    ).toEqual(coreInitialState);
    // retrieve apikey
    expect(
      ProcessStoreEventsReducer(coreInitialState, new mfa.RetrieveApiKey())
    ).toEqual(coreInitialState);
  });
});
