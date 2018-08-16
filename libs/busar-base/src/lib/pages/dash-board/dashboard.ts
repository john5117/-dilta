import { OnInit } from '@angular/core';
import {
  busarExpenseSummary,
  busarRevenueSummary
} from '@dilta/generator/src/lib/school.data';
import {
  Receipt,
  Setting,
  SettingPreference,
  User,
  School
} from '@dilta/models';
import { of } from 'rxjs/observable/of';
import { Authsuccess, SchoolService, AuthFeature } from '@dilta/store';
import { Store } from '@ngrx/store';
import {
  map,
  skipUntil,
  skipWhile,
  tap,
  combineLatest,
  pluck
} from 'rxjs/operators';

import { Router } from '@angular/router';

export class BusarDashBoardBase implements OnInit {
  revenueSummary$ = of(busarRevenueSummary());
  expenseSummary$ = of(busarExpenseSummary());

  constructor(
    private store: Store<any>,
    private school: SchoolService,
    private router: Router
  ) {}

  changeRoute(path: string) {
    this.router.navigateByUrl(path);
  }

  ngOnInit() {}
}
