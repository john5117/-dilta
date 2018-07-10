import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BusarReceiptFormComponent } from './busar-receipt-editor.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, ClarityModule],
  exports: [BusarReceiptFormComponent],
  declarations: [BusarReceiptFormComponent]
})
export class BusarReceiptFormModule {}
