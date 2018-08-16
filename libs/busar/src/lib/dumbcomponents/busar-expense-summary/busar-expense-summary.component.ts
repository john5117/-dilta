import { Component } from '@angular/core';
import { BusarExpenseSummaryBase } from '@dilta/busar-base';

@Component({
  selector: 'busar-expense-summary',
  templateUrl: './busar-expense-summary.component.html',
  styleUrls: ['./busar-expense-summary.component.scss']
})
export class BusarExpenseSummaryComponent extends BusarExpenseSummaryBase {
  constructor() {
    super();
  }
}
