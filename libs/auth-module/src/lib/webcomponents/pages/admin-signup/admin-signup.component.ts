import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserSignupBase } from '@dilta/auth-module/src/lib/base/pages';
import { AppConfigToken, AppConfiguration } from '@dilta/platform-config/src';
import { Store } from '@ngrx/store';

/**
 * ui for signing up adminstartaions for login
 *
 * @export
 * @class AdminSignupComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'auth-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthUserSignupComponent extends AuthUserSignupBase {
  constructor(
    @Inject(AppConfigToken) config: AppConfiguration,
     route: Router,
     _actR: ActivatedRoute,
     store: Store<any>
  ) {
    super(config, route, _actR, store);
  }
}
