import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BusarExpenseFormPageBase } from '@dilta/busar-base';
import { SchoolService } from '@dilta/store';

@Component({
  selector: 'busar-expense-web',
  templateUrl: './busar-expense-form.component.html',
  styleUrls: ['./busar-expense-form.component.scss']
})
export class BusarExpenseWebFormComponent extends BusarExpenseFormPageBase {
  constructor(store: Store<any>, school: SchoolService) {
    super(store, school);
  }
}
