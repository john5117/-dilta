import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { busarExpenseSummary, busarRevenueSummary } from '@dilta/generator/src/lib/school.data';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';


export class BusarDashBoardBase implements OnInit {
  revenueSummary$ = of(busarRevenueSummary());
  expenseSummary$ = of(busarExpenseSummary());

  constructor(
    private store: Store<any>,
    private router: Router
  ) {}

  changeRoute(path: string) {
    this.router.navigateByUrl(path);
  }

  ngOnInit() {}
}
