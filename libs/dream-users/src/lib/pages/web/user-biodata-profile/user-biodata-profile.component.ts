import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBiodataProfilePageBase } from '@dilta/dream-users/src/lib/pages/base/user-biodata/user-biodata-profile';
import { DreamUserService } from '@dilta/dream-users/src/lib/services/dream-users.service';
import { admin, school } from '@dilta/generator';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dilta-user-biodata-profile',
  templateUrl: './user-biodata-profile.component.html',
  styleUrls: ['./user-biodata-profile.component.scss']
})
export class UserBiodataProfileComponent extends UserBiodataProfilePageBase {

  school = school();
  user = admin();

  constructor(
    store: Store<any>,
    actr: ActivatedRoute,
    route: Router,
    users: DreamUserService
  ) {
    super(store, actr, route, users);
  }
}
