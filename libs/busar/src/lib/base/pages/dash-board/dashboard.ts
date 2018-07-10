import { OnInit } from '@angular/core';
import { busarExpenseSummary, busarRevenueSummary } from '@dilta/generator/src/lib/school.data';
import { Receipt } from '@dilta/models';

export class BusarDashBoardBase implements OnInit {

  revenueSummary$ = busarRevenueSummary();
  expenseSummary$ = busarExpenseSummary();

  displayRecieptForm = false;
  displayExpenseForm = false;

  constructor() { }

  saveReciept(reciept: Receipt) {

  }

  ngOnInit() { }
}
