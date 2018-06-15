import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ManagersBiodataEditorComponent,
  Manager as _manager
} from './managers-biodata-editor.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ManagersBiodataEditorComponent],
  declarations: [ManagersBiodataEditorComponent]
})
export class ManagersBiodataEditorModule { }
