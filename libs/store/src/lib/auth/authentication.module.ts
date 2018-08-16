import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from '@dilta/store/src/lib/auth/auth.effect';
import { authReducer } from '@dilta/store/src/lib/auth/auth.reducer';

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
