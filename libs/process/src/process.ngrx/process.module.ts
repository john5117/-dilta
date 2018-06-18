import { NgModule } from '@angular/core';
import { ElectronProcessModule, ProcessEffectService } from '@dilta/electron/src/lib/renderer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
