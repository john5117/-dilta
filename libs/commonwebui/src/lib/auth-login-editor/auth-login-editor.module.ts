import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthLoginEditorComponent } from './auth-login-editor.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  exports: [AuthLoginEditorComponent],
  declarations: [AuthLoginEditorComponent]
})
export class AuthLoginEditorModule {}
