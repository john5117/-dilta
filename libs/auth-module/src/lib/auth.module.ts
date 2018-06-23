import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { EntityServicesModule } from '@dilta/store';
import { UtilModule } from '@dilta/util';
import { NgUploaderModule } from 'ngx-uploader';
import { AdminBiodataComponent } from './admin-biodata';
import { AdminSignupComponent } from './AdminSignup';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  imports: [
    CommonModule,
    CommonwebuiModule,
    UtilModule,
    NgUploaderModule,
    ReactiveFormsModule,
    RouterModule,
    EntityServicesModule
   ],
  declarations: [ AdminSignupComponent, AdminBiodataComponent,
    AdminLoginComponent
],
})
export class AuthPagesModule {}
