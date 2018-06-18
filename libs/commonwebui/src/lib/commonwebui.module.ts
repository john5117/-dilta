import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgUploaderModule } from 'ngx-uploader';
import { AdminBiodataEditorModule } from './admin-biodata-editor';
import { AuthLoginEditorModule } from './auth-login-editor';
import { AuthSignupEditorModule } from './auth-signup-editor';
import { DyanmicDatagridModule } from './dynamic-datagrid';
import { ManagersBiodataEditorModule } from './managers-biodata-editor';
import { ParentBiodataEditorModule } from './parent-biodata-editor';
import { SchoolBiodataEditorModule } from './school-biodata-editor';
import { SchoolRecieptEditorModule } from './school-receipt-editor';
import { StudentBiodataEditorModule } from './student-biodata-editor';

const _modules = [
  ManagersBiodataEditorModule,
  AdminBiodataEditorModule,
  ParentBiodataEditorModule,
  AuthLoginEditorModule,
  SchoolBiodataEditorModule,
  StudentBiodataEditorModule,
  AuthSignupEditorModule,
  SchoolRecieptEditorModule,
  DyanmicDatagridModule,
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    NgUploaderModule,
    NgxChartsModule,
    ..._modules
  ],
  declarations: [],
  providers: [],
  exports: [..._modules]
})
export class CommonwebuiModule {}
