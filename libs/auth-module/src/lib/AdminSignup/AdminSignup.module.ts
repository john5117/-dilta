import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { AdminSignupComponent } from './AdminSignup.component';

@NgModule({
  imports: [
    CommonModule, CommonwebuiModule
  ],
  declarations: [AdminSignupComponent]
})
export class AuthAdminSignUpModule { }
