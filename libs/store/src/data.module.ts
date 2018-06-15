import { NgModule } from '@angular/core';
import { OfflinedatabaseModule } from '@dilta/offlinedatabase/src/offlinedatabase.module';
import { AuthDataService } from './auth.service';
import { ManagerDataService } from './manager.service';
import { SchoolDataService } from './school.service';
import { UserDataService } from './users.service';

const providers = [
  UserDataService,
  SchoolDataService,
  ManagerDataService,
  AuthDataService
];

@NgModule({
  imports: [OfflinedatabaseModule],
  exports: [],
  declarations: [],
  providers
})
export class DataServicesModule {}
