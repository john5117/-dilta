import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ParentBiodataEditorComponent,
  Parent
} from './parent-biodata-editor.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ParentBiodataEditorComponent],
  declarations: [ParentBiodataEditorComponent]
})
export class ParentBiodataEditorModule {}
