import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { BusaryNgrxModule } from './store';
import { BusarDumbsModule, BusarHomePageComponent, BusarInfoDashboardComponent, BusarPreferencesComponent, BusarRoutingModule } from './webcomponents';

@NgModule({
  imports: [
    CommonModule,
    BusarDumbsModule,
    BusarRoutingModule,
    ClarityModule,
    CommonwebuiModule,
    BusaryNgrxModule
  ],
  exports: [BusarDumbsModule, ClarityModule, CommonwebuiModule],
  declarations: [BusarInfoDashboardComponent, BusarPreferencesComponent]
})
export class BusarAppModule {
  static RootComponent = BusarHomePageComponent;
}

