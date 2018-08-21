import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBioDataFormPageBase } from '@dilta/dream-users/src/lib/pages/base';
import { UserEntityService } from '@dilta/dream-users/src/lib/services/dream-users.entity';
import { UtilService } from '@dilta/util';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dilta-user-biodata-form-page',
  templateUrl: './admin-biodata.component.html',
  styleUrls: ['./admin-biodata.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBioDataFormPageComponent extends UserBioDataFormPageBase {
  constructor(
    _actR: ActivatedRoute,
    route: Router,
    util: UtilService,
    admin: UserEntityService,
    store: Store<any>
  ) {
    super(_actR, route, util, admin, store);
  }
}
