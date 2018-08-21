import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '@dilta/util';
import { Store } from '@ngrx/store';
import { AuthUserLoginBase } from '../../../base/pages';

@Component({
  selector: 'auth-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AuthUserLoginComponent extends AuthUserLoginBase {
  constructor(
    store: Store<any>,
    route: Router,
    util: UtilService
  ) {
    super(store, route, util);
  }
}
