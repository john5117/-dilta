import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Signup {
  username: string;
  password: string;
  level: string;
}


export class AuthSignupFormBase implements OnInit {
  @Input() public err: string;
  @Input() public levels: string[] = [];
  @Output() public emitter = new EventEmitter();

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  emit(value) {
    delete value.clogin_password;
    this.emitter.emit(value);
  }

  setupForm() {
    const { required } = Validators;
    this.signupForm = this.fb.group({
      username: [null, required],
      password: [null, required],
      level: [null || this.levels[0], required],
      clogin_password: [null, required]
    });
  }

  ngOnInit() {
    this.setupForm();
  }
}
