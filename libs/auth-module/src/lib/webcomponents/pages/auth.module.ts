import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticationFeatureNgrxModule } from '@dilta/auth-module/src/lib/ngrx';
import { ClientAuthService } from '@dilta/auth-module/src/lib/services/auth.service';
import { ClientAuthWebRoutingModule } from '@dilta/auth-module/src/lib/webcomponents/pages/auth.routing';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { UtilModule } from '@dilta/util';
import { AuthSharedModule } from '../shared/auth-shared.module';
import { AuthUserLoginComponent } from './admin-login/admin-login.component';
import { AuthUserSignupComponent } from './admin-signup/admin-signup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthSharedModule,
    UtilModule,
    ClientAuthWebRoutingModule,
    AuthenticationFeatureNgrxModule
  ],
  providers: [ClientAuthService],
  declarations: [AuthUserSignupComponent, AuthUserLoginComponent],
  exports: [AuthSharedModule, CommonwebuiModule]
})
export class AuthPagesModule {}
