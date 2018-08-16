import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLoginFormComponent } from './auth-login-form/auth-login-editor.component';
import { AuthSignupFormComponent } from './auth-signup-form/auth-signup-editor.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthLoginFormComponent, AuthSignupFormComponent],
  exports: [AuthLoginFormComponent, AuthSignupFormComponent]
})
export class AuthSharedModule {}
