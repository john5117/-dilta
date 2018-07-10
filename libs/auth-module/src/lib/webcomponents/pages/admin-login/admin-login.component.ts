import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessReducer } from '@dilta/process';
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
    store: Store<ProcessReducer>,
    route: Router,
    _actR: ActivatedRoute,
    util: UtilService
  ) {
    super(store, route, _actR, util);
  }
}
