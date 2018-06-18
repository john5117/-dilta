import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Login {
  username: string;
  password: string;
}

/**
 *  AuthLoginEditorComponent
 *  usage: <app-auth-login-editor (emitter)="log($event)" ></app-auth-login-editor>
 *  dispacthes an event emitter when inner form is valid.
 */

@Component({
  selector: 'app-auth-login-editor',
  templateUrl: './auth-login-editor.component.html',
  styleUrls: ['./auth-login-editor.component.scss']
})
export class AuthLoginEditorComponent implements OnInit {
  /**
   * @var {EventEmitter} emitter
   *
   * @memberof AuthLoginEditorComponent
   */
  @Output() public emitter = new EventEmitter();
  @Input() err;
  // = `Invalid PhoneNo or password`;

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  /**
   * initalize the form group
   *
   * @returns
   * @memberof AuthLoginEditorComponent
   */
  public form() {
    const { required } = Validators;
    return this.fb.group({
      username: [null, required],
      password: [null, required]
    });
  }

  /**
   *
   *
   * @param {Login} value
   * @memberof AuthLoginEditorComponent
   */
  public emit(value: Login) {
    if (!value.password || !value.username) {
      value = this.loginForm.value;
    }
    console.log(value);
    this.emitter.emit(value);
  }

  ngOnInit() {
    this.loginForm = this.form();
  }
}
