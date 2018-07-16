import { NgModule } from '@angular/core';
import { ElectronProcessModule, ProcessEffectService } from '@dilta/electron/src/lib/renderer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProcessFeatureName, ProcessStoreEventsReducer } from './process.reducer';




@NgModule({
  imports: [
    ElectronProcessModule,
    StoreModule.forFeature(ProcessFeatureName, ProcessStoreEventsReducer),
    EffectsModule.forFeature([ProcessEffectService])
  ],
  exports: [],
  providers: []
})
export class ProcessNgrxModule {}
