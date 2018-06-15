import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  ElectronProcessModule,
  ProcessEffectService
} from '@dilta/electron/src/renderer';

import { reducer } from './reducer';

export const ProcessFeatureName = 'process';

@NgModule({
  imports: [
    ElectronProcessModule,
    StoreModule.forFeature(ProcessFeatureName, reducer),
    EffectsModule.forFeature([ProcessEffectService])
  ],
  exports: [],
  providers: []
})
export class ProcessNgrxModule {}
