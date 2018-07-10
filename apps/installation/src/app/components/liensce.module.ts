import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AuthPagesModule } from '@dilta/auth-module';
import { CommonWebPagesModule, CommonwebuiModule } from '@dilta/commonwebui';
import { EntityServicesModule } from '@dilta/store';
import { UtilModule } from '@dilta/util';
import { NgUploaderModule } from 'ngx-uploader';
import { AdminSetupComponent } from './AdminSetup';
import { LiensceKeyComponent } from './LiensceKey';
import { SchoolComponent } from './school';
import { SetupDoneComponent } from './setup-done/setup-done.component';




const _comps = [
  AdminSetupComponent,
  LiensceKeyComponent,
  SchoolComponent,
  SetupDoneComponent
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CommonwebuiModule,
    CommonWebPagesModule,
    ClarityModule,
    UtilModule,
    NgUploaderModule,
    ReactiveFormsModule,
    FormsModule,
    EntityServicesModule,
    AuthPagesModule
  ],
  exports: [],
  declarations: _comps,
  providers: []
})
export class LienscePagesModule {}
