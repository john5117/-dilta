import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgUploaderModule } from 'ngx-uploader';
import { AdminBiodataEditorModule } from './admin-biodata-editor';
import { PreferencesFormComponent } from './app-preferences-form/app-preferences-form.component';
import { PreferencesFormListComponent } from './app-preferences-list/preferences-list.component';
import { DyanmicDatagridModule } from './dynamic-datagrid';
import { ManagersBiodataEditorModule } from './managers-biodata-editor';
import { ParentBiodataEditorModule } from './parent-biodata-editor';
import { SchoolBiodataEditorModule } from './school-biodata-editor';
import { SideBarComponent } from './side-bar/side-bar.component';
import { StudentBiodataEditorModule } from './student-biodata-editor';


const _modules = [
  ManagersBiodataEditorModule,
  AdminBiodataEditorModule,
  ParentBiodataEditorModule,
  SchoolBiodataEditorModule,
  StudentBiodataEditorModule,
  DyanmicDatagridModule,
];

const _comps = [
  PreferencesFormComponent,
  SideBarComponent,
  PreferencesFormListComponent
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
  declarations: _comps,
  providers: [],
  exports: [..._modules, ..._comps, ClarityModule]
})
export class CommonwebuiModule {}
