import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentBiodataEditorComponent } from './student-biodata-editor.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [StudentBiodataEditorComponent],
  declarations: [StudentBiodataEditorComponent],
  providers: []
})
export class StudentBiodataEditorModule {}
