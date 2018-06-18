import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchoolReceiptEditorComponent } from './school-receipt-editor.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  exports: [SchoolReceiptEditorComponent],
  declarations: [SchoolReceiptEditorComponent]
})
export class SchoolRecieptEditorModule {}
