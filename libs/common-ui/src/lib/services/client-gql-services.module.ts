import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { DreamExpenseService } from './expense.service';
import { DreamManagerService } from './manager.service';
import { DreamReceiptService } from './reciept.service';
import { DreamSettingService } from './settings.service';

@NgModule({
  imports: [ApolloModule],
  providers: [ DreamExpenseService, DreamManagerService, DreamReceiptService, DreamSettingService ]
})
export class GeneralClientGQLServicesModule {}
