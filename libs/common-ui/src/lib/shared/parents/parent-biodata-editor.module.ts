import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ParentBiodataFormBase } from './parent-biodata-form';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ParentBiodataFormBase],
  declarations: [ParentBiodataFormBase]
})
export class ParentBiodataEditorModule {}
