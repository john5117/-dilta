import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import '@clr/icons';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BusarDashboardLineComponent } from './busar-dashboard-line/busar-dashboard-line.component';
import { BusarExpenseFormComponent } from './busar-expense-form/busar-expense-form.component';
import { BusarExpenseSummaryComponent } from './busar-expense-summary/busar-expense-summary.component';
import { BusarNavBarComponent } from './busar-nav-bar';
import { BusarReceiptFormComponent } from './busar-receipt-editor';
import { BusarRevenueSummaryComponent } from './busar-revenue-summary/busar-revenue-summary.component';


@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule, NgxChartsModule, ReactiveFormsModule],
  exports: [BusarNavBarComponent, BusarDashboardLineComponent,
    BusarRevenueSummaryComponent, BusarExpenseSummaryComponent,
     BusarReceiptFormComponent, BusarExpenseFormComponent],
  declarations: [
    BusarNavBarComponent,
    BusarDashboardLineComponent,
    BusarRevenueSummaryComponent,
    BusarExpenseSummaryComponent,
    BusarReceiptFormComponent
,
    BusarExpenseFormComponent
],
  providers: []
})
export class BusarDumbsModule {}
