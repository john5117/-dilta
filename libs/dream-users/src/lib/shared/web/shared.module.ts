import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgUploaderModule } from 'ngx-uploader';
import { AdminBiodataEditorComponent } from './admin-biodata-editor/admin-biodata-editor.component';
import { LargeUserProfileComponent } from './large-user-profile/large-user-profile.component';
import { SmallUserProfileComponent } from './small-user-profile/small-user-profile.component';

const declarations = [
  SmallUserProfileComponent,
  LargeUserProfileComponent,
  AdminBiodataEditorComponent
];

@NgModule({
  imports: [NgUploaderModule, CommonModule, ReactiveFormsModule],
  exports: declarations,
  declarations,
  providers: []
})
export class DreamUserSharedModule {}
