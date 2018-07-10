import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagersBiodataEditorComponent } from './managers-biodata-editor.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ManagersBiodataEditorComponent],
  declarations: [ManagersBiodataEditorComponent]
})
export class ManagersBiodataEditorModule {}
