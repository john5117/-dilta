import { NgModule } from '@angular/core';
import {
  ElectronProcessModule,
  ProcessEffectService
} from '@dilta/electron/src/lib/renderer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SettingsEffects } from '@dilta/process/src/ngrx/process.effects';
import {
  ProcessFeatureName,
  ProcessStoreEventsReducer
} from '@dilta/process/src/ngrx/process.reducer';

@NgModule({
  imports: [
    ElectronProcessModule,
    StoreModule.forFeature(ProcessFeatureName, ProcessStoreEventsReducer),
    EffectsModule.forFeature([ProcessEffectService, SettingsEffects])
  ],
  exports: [],
  providers: []
})
export class ProcessNgrxModule {}
