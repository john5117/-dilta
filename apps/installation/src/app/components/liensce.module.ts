import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from 'clarity-angular';
import { NgUploaderModule } from 'ngx-uploader';

import { EntityServicesModule } from '@dilta/store';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { UtilModule } from '@dilta/util';

import { AdminSetupComponent } from './AdminSetup';
import { LiensceKeyComponent } from './LiensceKey';
import { SchoolComponent } from './school';
import { AdminSignupComponent } from './AdminSignup';
import { AdminBiodataComponent } from './admin-biodata/admin-biodata.component';
import { SetupDoneComponent } from './setup-done/setup-done.component';

const _comps = [
  AdminSetupComponent,
  LiensceKeyComponent,
  SchoolComponent,
  AdminSignupComponent,
  AdminBiodataComponent,
  SetupDoneComponent
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CommonwebuiModule,
    ClarityModule,
    UtilModule,
    NgUploaderModule,
    ReactiveFormsModule,
    FormsModule,
    EntityServicesModule
  ],
  exports: [],
  declarations: _comps,
  providers: []
})
export class LienscePagesModule {}
