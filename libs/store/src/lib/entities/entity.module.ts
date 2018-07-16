import { NgModule } from '@angular/core';
import { EntityDataService, EntityMetadataMap } from 'ngrx-data';
import { AuthDataService, AuthService } from './auth.service';
import { DataServicesModule } from './data.module';
import { ExpenseDataService, ExpenseService } from './expense.service';
import { ManagerDataService, ManagerService } from './manager.service';
import { ReceiptDataService, ReceiptService } from './reciept.service';
import { SchoolDataService, SchoolService } from './school.service';
import { SettingDataService, SettingService } from './setting.service';
import { UserDataService, UserService } from './users.service';

export const entityMetadata: EntityMetadataMap = {
  user: {},
  school: {},
  manager: {},
  auth: {},
  reciept: {},
  expense: {},
  setting: {}
};

export const providers = [
  UserService,
  SchoolService,
  ManagerService,
  AuthService,
  ReceiptService,
  SettingService,
  ExpenseService
];

@NgModule({
  imports: [DataServicesModule],
  providers
})
export class EntityServicesModule {
  constructor(
    eds: EntityDataService,
    auth: AuthDataService,
    manager: ManagerDataService,
    school: SchoolDataService,
    user: UserDataService,
    reciept: ReceiptDataService,
    setting: SettingDataService,
    expense: ExpenseDataService
  ) {
    eds.registerServices({
      auth,
      user,
      manager,
      reciept,
      school,
      setting,
      expense
    });
  }
}
