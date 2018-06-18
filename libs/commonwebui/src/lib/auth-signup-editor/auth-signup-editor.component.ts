import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Signup {
  username: string;
  password: string;
  level: string;
}

/**
 * @class AuthSignupEditorComponent
 * @param usage <app-auth-signup-editor (emitter)="log($event)" [err]="err" ></app-auth-signup-editor>
 * emits a valid input with (emitter)
 * provides error input with [err]
 */
@Component({
  selector: 'app-auth-signup-editor',
  templateUrl: './auth-signup-editor.component.html',
  styleUrls: ['./auth-signup-editor.component.scss']
})
export class AuthSignupEditorComponent implements OnInit {
  @Input() public err: string;
  @Input() public levels: string[] = [];
  @Output() public emitter = new EventEmitter();

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    const { required } = Validators;
    this.signupForm = this.fb.group({
      username: [null, required],
      password: [null, required],
      level: [null, required],
      clogin_password: [null, required]
    });
  }

  emit(value) {
    delete value.clogin_password;
    this.emitter.emit(value);
  }

  ngOnInit() {}
}
