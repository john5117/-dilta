import { NgModule } from '@angular/core';
import { EntityNames } from '@dilta/commonwebui/src/lib/ngrx/entities/constants';
import { GeneralClientGQLServicesModule } from '@dilta/commonwebui/src/lib/services';
import { EntityDataService } from 'ngrx-data';
import { ExpenseEntityGQLService, ExpenseEntityService } from './expense.entity';
import { ManagerEntityGQLService, ManagerEntityService } from './manager.entity';
import { ReceiptEntityGQLService, ReceiptEntityService } from './reciept.entity';
import { SettingEntityGQLService, SettingEntityService } from './setting.entity';

export const providers = [
  ExpenseEntityGQLService,
  ExpenseEntityService,
  ManagerEntityGQLService,
  ManagerEntityService,
  ReceiptEntityGQLService,
  ReceiptEntityService,
  SettingEntityGQLService,
  SettingEntityService
];

@NgModule({
  imports: [GeneralClientGQLServicesModule],
  providers
})
export class EntityServicesModule {
  constructor(
    eds: EntityDataService,
    expense: ExpenseEntityGQLService,
    manager: ManagerEntityGQLService,
    reciept: ReceiptEntityGQLService,
    setting: SettingEntityGQLService
  ) {
    eds.registerService(EntityNames.Expense, expense);
    eds.registerService(EntityNames.Manager, manager);
    eds.registerService(EntityNames.Receipt, reciept);
    eds.registerService(EntityNames.Setting, setting);
  }
}
