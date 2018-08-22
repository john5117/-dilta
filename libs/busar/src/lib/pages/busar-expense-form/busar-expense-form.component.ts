import { Component } from '@angular/core';
import { BusarExpenseFormPageBase } from '@dilta/busar-base';
import { Store } from '@ngrx/store';

@Component({
  selector: 'busar-expense-web',
  templateUrl: './busar-expense-form.component.html',
  styleUrls: ['./busar-expense-form.component.scss']
})
export class BusarExpenseWebFormComponent extends BusarExpenseFormPageBase {
  constructor(store: Store<any>) {
    super(store);
  }
}
