import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthSignupFormBase } from '../../../base/shared';

/**
 * @class AuthSignupFormComponent
 * @param usage <auth-signup-form (emitter)="log($event)" [err]="err" ></auth-signup-form>
 * emits a valid input with (emitter)
 * provides error input with [err]
 */
@Component({
  selector: 'auth-signup-form',
  templateUrl: './auth-signup-editor.component.html',
  styleUrls: ['./auth-signup-editor.component.scss']
})
export class AuthSignupFormComponent extends AuthSignupFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
