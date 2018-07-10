import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Login {
  username: string;
  password: string;
}

export class AuthLoginFormBase implements OnInit {
  /**
   * @var {EventEmitter} emitter
   *
   * @memberof AuthLoginFormBase
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
   * @memberof AuthLoginFormBase
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
   * @memberof AuthLoginFormBase
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
