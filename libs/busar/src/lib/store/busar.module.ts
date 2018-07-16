import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BusaryEffects, BusaryStoreFeatureName } from './busar.effects';
import { reducer } from './busar.reducer';



@NgModule({
  imports: [
    StoreModule.forFeature(BusaryStoreFeatureName, reducer),
    EffectsModule.forFeature([BusaryEffects])
  ],
  providers: [],
})
export class BusaryNgrxModule { }
