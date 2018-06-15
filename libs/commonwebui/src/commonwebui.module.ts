import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgUploaderModule } from 'ngx-uploader';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ClarityModule } from 'clarity-angular';

import { ManagersBiodataEditorComponent } from './managers-biodata-editor';
import { SchoolBiodataEditorComponent } from './school-biodata-editor';
import { StudentBiodataEditorComponent } from './student-biodata-editor';
import { ParentBiodataEditorComponent } from './parent-biodata-editor';
import { SchoolReceiptEditorComponent } from './school-receipt-editor';
import { AdminBiodataEditorComponent } from './admin-biodata-editor';
import { AuthLoginEditorComponent } from './auth-login-editor';
import { AuthSignupEditorComponent } from './auth-signup-editor';
import { DynamicDataGridComponent } from './dynamic-datagrid';
import { ChartsComponent } from './chart-resolver';

const _comps = [
  ManagersBiodataEditorComponent,
  AuthSignupEditorComponent, DynamicDataGridComponent,
  SchoolReceiptEditorComponent,
  AdminBiodataEditorComponent,
  ParentBiodataEditorComponent,
  AuthLoginEditorComponent,
  ChartsComponent,
  SchoolBiodataEditorComponent,
  StudentBiodataEditorComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    NgUploaderModule,
    NgxChartsModule
  ],
  declarations: _comps,
  providers: [],
  exports: _comps
})
export class CommonwebuiModule {}
