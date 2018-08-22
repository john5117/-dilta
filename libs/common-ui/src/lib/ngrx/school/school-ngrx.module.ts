import { NgModule } from '@angular/core';
import { School } from '@dilta/models';
import { EffectsModule } from '@ngrx/effects';
import { createFeatureSelector, StoreModule } from '@ngrx/store';
import { SchoolEffect } from './school.effects';
import { schoolReducer } from './school.reducer';
import { SchoolService } from './school.service';


export const SchoolFeatureName = 'School';
export const schoolFeature = createFeatureSelector<School>(SchoolFeatureName);

@NgModule({
  imports: [
    StoreModule.forFeature(SchoolFeatureName, schoolReducer),
    EffectsModule.forFeature([SchoolEffect]),
  ],
  exports: [],
  providers: [SchoolService]
})
export class SchoolFeatureNgrxModule {}
