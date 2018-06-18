import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgUploaderModule } from 'ngx-uploader';

import { AdminBiodataEditorComponent } from './admin-biodata-editor.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, NgUploaderModule],
  exports: [AdminBiodataEditorComponent],
  declarations: [AdminBiodataEditorComponent]
})
export class AdminBiodataEditorModule {}
