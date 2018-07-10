import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { EntityServicesModule } from '@dilta/store';
import { UtilModule } from '@dilta/util';
import { NgUploaderModule } from 'ngx-uploader';
import { AuthSharedModule } from '../shared/auth-shared.module';
import { AuthUserLoginComponent } from './admin-login/admin-login.component';
import { AuthUserSignupComponent } from './AdminSignup/AdminSignup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthSharedModule,
    CommonwebuiModule,
    UtilModule,
    NgUploaderModule,
    ReactiveFormsModule,
    RouterModule,
    EntityServicesModule
  ],
  declarations: [AuthUserSignupComponent, AuthUserLoginComponent],
  exports: [AuthSharedModule]
})
export class AuthPagesModule {}
