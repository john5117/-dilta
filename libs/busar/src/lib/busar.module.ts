import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonwebuiModule } from '@dilta/commonwebui';
// tslint:disable-next-line:max-line-length
import {
  BusarHomePageComponent,
  BusarInfoDashboardComponent,
  BusarPreferencesComponent,
  BusarRecieptWebFormComponent,
  BusarExpenseWebFormComponent
} from './pages';
import { BusarRoutingModule } from './busar-routes.module';
import { BusarDumbsModule } from './dumbcomponents';
import { BusaryNgrxModule } from '@dilta/busar-base';
import { EntityServicesModule } from '@dilta/store';

@NgModule({
  imports: [
    CommonModule,
    BusarDumbsModule,
    BusarRoutingModule,
    ClarityModule,
    CommonwebuiModule,
    BusaryNgrxModule,
    EntityServicesModule
  ],
  exports: [
    BusarDumbsModule,
    ClarityModule,
    CommonwebuiModule,
    BusarRecieptWebFormComponent,
    BusarExpenseWebFormComponent
  ],
  declarations: [
    BusarInfoDashboardComponent,
    BusarPreferencesComponent,
    BusarRecieptWebFormComponent,
    BusarExpenseWebFormComponent
  ]
})
export class BusarAppModule {
  static RootComponent = BusarHomePageComponent;
}
