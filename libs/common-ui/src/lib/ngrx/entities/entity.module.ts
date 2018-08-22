import { NgModule } from '@angular/core';
import { GeneralClientGQLServicesModule } from '@dilta/common-ui/src/lib/services';
import { EntityNames } from '@dilta/models';
import { EntityDataService, NgrxDataModule } from 'ngrx-data';
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
  imports: [NgrxDataModule.forRoot({}), GeneralClientGQLServicesModule],
  providers
})
export class CommonNgrxEntityServicesModule {
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
