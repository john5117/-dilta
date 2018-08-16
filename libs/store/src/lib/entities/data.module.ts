import { NgModule } from '@angular/core';
import { OfflinedatabaseModule } from '@dilta/offlinedatabase/src/lib/offlinedatabase.module';
import { AuthDataService } from '@dilta/store/src/lib/entities/auth.service';
import { ExpenseDataService } from '@dilta/store/src/lib/entities/expense.service';
import { ManagerDataService } from '@dilta/store/src/lib/entities/manager.service';
import { ReceiptDataService } from '@dilta/store/src/lib/entities/reciept.service';
import { SchoolDataService } from '@dilta/store/src/lib/entities/school.service';
import { SettingDataService } from '@dilta/store/src/lib/entities/setting.service';
import { UserDataService } from '@dilta/store/src/lib/entities/users.service';

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
