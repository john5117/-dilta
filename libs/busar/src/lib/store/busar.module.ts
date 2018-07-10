import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { createFeatureSelector, StoreModule } from '@ngrx/store';
import { BusaryEffects } from './busar.effects';
import { reducer, SettingState } from './busar.reducer';

export const BusaryStoreFeatureName = 'busary';
export const BusarFeature = createFeatureSelector<SettingState>(BusaryStoreFeatureName);



@NgModule({
  imports: [
    StoreModule.forFeature(BusaryStoreFeatureName, reducer),
    EffectsModule.forFeature([BusaryEffects])
  ],
  providers: [],
})
export class BusaryNgrxModule { }
