import { ActionReducer } from '@ngrx/store';
import { ProcessStoreEventsReducer, ProcessState } from './process.reducer';

export type ProcessReducer = ProcessState;

export const reducer = ProcessStoreEventsReducer;
