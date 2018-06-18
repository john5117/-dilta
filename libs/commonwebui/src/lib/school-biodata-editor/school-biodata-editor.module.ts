import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SchoolBiodataEditorComponent } from './school-biodata-editor.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SchoolBiodataEditorComponent],
  declarations: [SchoolBiodataEditorComponent],
  providers: []
})
export class SchoolBiodataEditorModule {}
