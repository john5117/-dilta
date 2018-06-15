import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { DynamicDataGridComponent  } from './dynamic-datagrid.component';

@NgModule({
  imports: [ CommonModule, ClarityModule],
  exports: [DynamicDataGridComponent],
  declarations: [DynamicDataGridComponent],
  providers: [],
})
export class DyanmicDatagridModule { }
