import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgUploaderModule } from 'ngx-uploader';
import { AdminBiodataEditorComponent } from './admin-biodata-editor/admin-biodata-editor.component';
import { PreferencesFormComponent } from './app-preferences-form/app-preferences-form.component';
import { PreferencesFormListComponent } from './app-preferences-list/preferences-list.component';
// import { DynamicDataGridComponent } from './dynamic-datagrid/dynamic-datagrid.component';
import { ManagersBiodataEditorComponent } from './managers-biodata-editor/managers-biodata-editor.component';
import { ParentBiodataEditorComponent } from './parent-biodata-editor/parent-biodata-editor.component';
import { PreferenceSelectListComponent } from './preference-select-list/preference-select-list.component';
import { SchoolBiodataEditorComponent } from './school-biodata-editor/school-biodata-editor.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { StudentBiodataEditorComponent } from './student-biodata-editor/student-biodata-editor.component';

const _comps = [
  PreferencesFormComponent,
  SideBarComponent,
  PreferencesFormListComponent,
  StudentBiodataEditorComponent,
  AdminBiodataEditorComponent,
  ManagersBiodataEditorComponent,
  ParentBiodataEditorComponent,
  SchoolBiodataEditorComponent,
  PreferenceSelectListComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsNextModule,
    NgUploaderModule,
    NgxChartsModule
  ],
  declarations: _comps,
  providers: [],
  exports: [..._comps, ClarityModule, NgUploaderModule, ReactiveFormsModule]
})
export class CommonwebuiModule {}
