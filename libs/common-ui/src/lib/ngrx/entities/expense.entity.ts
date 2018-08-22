import { Injectable } from '@angular/core';
import { DreamExpenseService } from '@dilta/commonwebui/src/lib/services';
import { Expense } from '@dilta/models';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from './constants';
import { EntityDataBase } from './entitybase';

/**
 * Service thst instantite both the creation of the entity
 * and the effects
 *
 * @export
 * @class ExpenseDataService
 * @extends {EntityDataBase<Expense>}
 */
@Injectable()
export class ExpenseEntityGQLService extends EntityDataBase<Expense> {
  constructor(service: DreamExpenseService) {
    super(EntityNames.Expense, service);
  }

}

/**
 * Service responsible for creating Expense Entity
 *
 * @export
 * @class ExpenseService
 * @extends {EntityServiceBase<Expense>}
 */
@Injectable()
export class ExpenseEntityService extends EntityServiceBase<Expense> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Expense, entityServiceFactory);
  }
}
