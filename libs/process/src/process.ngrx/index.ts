export * from './actions';
export * from './reducer';
export * from './process.module';

import { ProcessReducer } from './reducer';
import { createFeatureSelector } from '@ngrx/store';
import { ProcessFeatureName } from './process.module';

/** feature selector for selecting process state section fro the store */
export const processFeature = createFeatureSelector<ProcessReducer>(
  ProcessFeatureName
);
