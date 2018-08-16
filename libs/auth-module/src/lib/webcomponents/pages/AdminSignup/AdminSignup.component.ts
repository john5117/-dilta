import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@dilta/store';
import { UtilService } from '@dilta/util';
import { AuthUserSignupBase } from '../../../base/pages';

/**
 * ui for signing up adminstartaions for login
 *
 * @export
 * @class AdminSignupComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'auth-admin-signup',
  templateUrl: './AdminSignup.component.html',
  styleUrls: ['./AdminSignup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthUserSignupComponent extends AuthUserSignupBase {
  constructor(
    route: Router,
    _actR: ActivatedRoute,
    util: UtilService,
    auth: AuthService
  ) {
    super(route, _actR, util, auth);
  }
}
