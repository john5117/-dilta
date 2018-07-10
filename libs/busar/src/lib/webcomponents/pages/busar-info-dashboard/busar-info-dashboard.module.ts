import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { BusarDumbsModule } from '@dilta/busar/src/lib/webcomponents/dumbcomponents';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { BusarInfoDashboardComponent } from './busar-info-dashboard.component';


@NgModule({
  imports: [CommonModule, BusarDumbsModule, ClarityModule, CommonwebuiModule],
  exports: [BusarDumbsModule, ClarityModule, CommonwebuiModule],
  declarations: [BusarInfoDashboardComponent],
})
export class BusarInfoDashboardComponentModule { }
