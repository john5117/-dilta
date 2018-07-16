import { Inject, Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { Expense } from '@dilta/models';
import { RecieptModel } from '@dilta/offlinedatabase/src/lib/model.tokens';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from './constants';
import { EntityDataBase } from './entitybase';


/**
 * DataService for expenses
 *
 * @export
 * @class ExpenseDataService
 * @extends {EntityDataBase<Expense>}
 */
@Injectable()
export class ExpenseDataService extends EntityDataBase<Expense> {
  constructor(@Inject(RecieptModel) service: Model<Expense>) {
    super(EntityNames.Expense, service);
  }
}

@Injectable()
export class ExpenseService extends EntityServiceBase<Expense> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Expense, entityServiceFactory);
  }
}
