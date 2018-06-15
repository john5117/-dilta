import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { AuthSignupEditorComponent } from './auth-signup-editor.component';

@NgModule({
  declarations: [ AuthSignupEditorComponent ],
  imports: [ CommonModule, ReactiveFormsModule ],
  exports: [AuthSignupEditorComponent]
})
export class AuthSignupEditorModule { }
