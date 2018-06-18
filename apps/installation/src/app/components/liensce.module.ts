import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { EntityServicesModule } from '@dilta/store';
import { UtilModule } from '@dilta/util';
import { NgUploaderModule } from 'ngx-uploader';
import { AdminBiodataComponent } from './admin-biodata/admin-biodata.component';
import { AdminSetupComponent } from './AdminSetup';
import { AdminSignupComponent } from './AdminSignup';
import { LiensceKeyComponent } from './LiensceKey';
import { SchoolComponent } from './school';
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
