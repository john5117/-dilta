import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolService, UserService } from '@dilta/store';
import { UtilService } from '@dilta/util';
import { Store } from '@ngrx/store';
import { UserBioDataFormPageBase } from '../../../base/pages';


@Component({
  selector: 'app-user-biodata-form-page',
  templateUrl: './admin-biodata.component.html',
  styleUrls: ['./admin-biodata.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBioDataFormPageComponent extends UserBioDataFormPageBase {
  constructor(
    _actR: ActivatedRoute,
    route: Router,
    util: UtilService,
    admin: UserService,
    school: SchoolService,
    store: Store<any>
  ) {
    super(_actR, route, util, admin, school, store);
  }
}
