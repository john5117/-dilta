import { Store } from '@ngrx/store';
import { BusarPaymentBase } from './payments.form';

export class BusarExpenseFormPageBase extends BusarPaymentBase {
  constructor(store: Store<any>) {
    super(store);
  }
}
