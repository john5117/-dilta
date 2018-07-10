import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgUploaderModule } from 'ngx-uploader';
import { SchoolBiodataEditorComponent } from './school-biodata-editor.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgUploaderModule],
  exports: [SchoolBiodataEditorComponent],
  declarations: [SchoolBiodataEditorComponent],
  providers: []
})
export class SchoolBiodataEditorModule {}
