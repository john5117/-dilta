import { BusarPaymentBase } from './payments.form';
import { Store } from '@ngrx/store';
import { SchoolService } from '@dilta/store';

export class BusarExpenseFormPageBase extends BusarPaymentBase {
  constructor(store: Store<any>, school: SchoolService) {
    super(store, school);
  }
}
