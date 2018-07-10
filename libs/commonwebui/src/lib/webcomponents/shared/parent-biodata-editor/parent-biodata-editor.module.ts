import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ParentBiodataEditorComponent } from './parent-biodata-editor.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ParentBiodataEditorComponent],
  declarations: [ParentBiodataEditorComponent]
})
export class ParentBiodataEditorModule {}
