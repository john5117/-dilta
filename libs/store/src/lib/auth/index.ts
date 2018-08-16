import { createFeatureSelector } from '@ngrx/store';
import { Authsuccess } from '@dilta/store/src/lib/auth/auth.reducer';
import { AuthenticationFeatureName } from '@dilta/store/src/lib/auth/authentication.module';

/** feature selector for selecting process state section fro the store */
export const AuthFeature = createFeatureSelector<Authsuccess>(
  AuthenticationFeatureName
);

export * from '@dilta/store/src/lib/auth/auth.action';
export * from '@dilta/store/src/lib/auth/auth.effect';
export * from '@dilta/store/src/lib/auth/auth.reducer';
export * from '@dilta/store/src/lib/auth/authentication.module';
