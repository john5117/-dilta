import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { BusaryNgrxModule } from '@dilta/busar-base';
import { CommonNgrxEntityServicesModule } from '@dilta/common-ui/src';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { BusarRoutingModule } from './busar-routes.module';
import { BusarDumbsModule } from './dumbcomponents';
// tslint:disable-next-line:max-line-length
import { BusarExpenseWebFormComponent, BusarHomePageComponent, BusarInfoDashboardComponent, BusarPreferencesComponent, BusarRecieptWebFormComponent } from './pages';

@NgModule({
  imports: [
    CommonModule,
    BusarDumbsModule,
    BusarRoutingModule,
    ClarityModule,
    CommonwebuiModule,
    BusaryNgrxModule,
    CommonNgrxEntityServicesModule
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
