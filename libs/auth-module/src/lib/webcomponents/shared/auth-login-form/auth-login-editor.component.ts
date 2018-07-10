import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthLoginFormBase } from '../../../base/shared';

/**
 *  AuthLoginFormComponent
 *  usage: <auth-login-editor (emitter)="log($event)" ></auth-login-editor>
 *  dispacthes an event emitter when inner form is valid.
 */

@Component({
  selector: 'auth-login-form',
  templateUrl: './auth-login-editor.component.html',
  styleUrls: ['./auth-login-editor.component.scss']
})
export class AuthLoginFormComponent extends AuthLoginFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
