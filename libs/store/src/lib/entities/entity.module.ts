import { NgModule } from '@angular/core';
import { EntityDataService, EntityMetadataMap } from 'ngrx-data';
import {
  AuthDataService,
  AuthService
} from '@dilta/store/src/lib/entities/auth.service';
import { DataServicesModule } from '@dilta/store/src/lib/entities/data.module';
import {
  ExpenseDataService,
  ExpenseService
} from '@dilta/store/src/lib/entities/expense.service';
import {
  ManagerDataService,
  ManagerService
} from '@dilta/store/src/lib/entities/manager.service';
import {
  ReceiptDataService,
  ReceiptService
} from '@dilta/store/src/lib/entities/reciept.service';
import {
  SchoolDataService,
  SchoolService
} from '@dilta/store/src/lib/entities/school.service';
import {
  SettingDataService,
  SettingService
} from '@dilta/store/src/lib/entities/setting.service';
import {
  UserDataService,
  UserService
} from '@dilta/store/src/lib/entities/users.service';

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
