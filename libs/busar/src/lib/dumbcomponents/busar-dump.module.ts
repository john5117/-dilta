import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import '@clr/icons';
import { CommonwebuiModule } from '@dilta/commonwebui';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BusarDashboardLineComponent } from './busar-dashboard-line/busar-dashboard-line.component';
import { BusarExpenseFormComponent } from './busar-expense-form/busar-expense-form.component';
import { BusarExpenseSummaryComponent } from './busar-expense-summary/busar-expense-summary.component';
import { BusarNavBarComponent } from './busar-nav-bar/busar-nav-bar.component';
import { BusarReceiptFormComponent } from './busar-receipt-editor/busar-receipt-editor.component';
import { BusarRecieptViewComponent } from './busar-reciept-view/busar-reciept-view.component';
import { BusarRevenueSummaryComponent } from './busar-revenue-summary/busar-revenue-summary.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule,
    NgxChartsModule,
    ReactiveFormsModule,
    CommonwebuiModule
  ],
  exports: [
    BusarNavBarComponent,
    BusarDashboardLineComponent,
    BusarRevenueSummaryComponent,
    BusarExpenseSummaryComponent,
    BusarReceiptFormComponent,
    BusarExpenseFormComponent,
    BusarRecieptViewComponent
  ],
  declarations: [
    BusarNavBarComponent,
    BusarDashboardLineComponent,
    BusarRevenueSummaryComponent,
    BusarExpenseSummaryComponent,
    BusarReceiptFormComponent,
    BusarExpenseFormComponent,
    BusarRecieptViewComponent
  ],
  providers: []
})
export class BusarDumbsModule {}
