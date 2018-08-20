import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effect';
import { authReducer } from './auth.reducer';

export const AuthenticationFeatureName = 'Auth';

@NgModule({
  imports: [
    StoreModule.forFeature(AuthenticationFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [],
  providers: []
})
export class AuthenticationFeatureNgrxModule {}
