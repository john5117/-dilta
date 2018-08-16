import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { BusarDumbsModule } from '../../dumbcomponents';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { BusarInfoDashboardComponent } from './busar-info-dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BusarDumbsModule,
    ClarityModule,
    CommonwebuiModule,
    RouterModule.forRoot([])
  ],
  exports: [BusarDumbsModule, ClarityModule, CommonwebuiModule],
  declarations: [BusarInfoDashboardComponent]
})
export class BusarInfoDashboardComponentModule {}
