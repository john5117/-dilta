import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BusarExpenseFormBase } from '../../../base/shared/busar-expense/busar-expense-form';

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
