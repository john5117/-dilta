import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BusarExpenseFormBase } from '@dilta/busar-base';

@Component({
  selector: 'busar-expense-form',
  templateUrl: './busar-expense-form.component.html',
  styleUrls: ['./busar-expense-form.component.scss']
})
export class BusarExpenseFormComponent extends BusarExpenseFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
