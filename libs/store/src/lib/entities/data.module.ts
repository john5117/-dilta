import { NgModule } from '@angular/core';
import { OfflinedatabaseModule } from '@dilta/offlinedatabase/src/lib/offlinedatabase.module';
import { AuthDataService } from './auth.service';
import { ExpenseDataService } from './expense.service';
import { ManagerDataService } from './manager.service';
import { ReceiptDataService } from './reciept.service';
import { SchoolDataService } from './school.service';
import { SettingDataService } from './setting.service';
import { UserDataService } from './users.service';

const providers = [
  UserDataService,
  SchoolDataService,
  ManagerDataService,
  AuthDataService,
  ReceiptDataService,
  ExpenseDataService,
  SettingDataService
];

@NgModule({
  imports: [OfflinedatabaseModule],
  exports: [],
  declarations: [],
  providers
})
export class DataServicesModule {}
