import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EntityServicesModule } from '@dilta/store';
import { UtilModule } from '@dilta/util';
import { NgUploaderModule } from 'ngx-uploader';
import { CommonwebuiModule } from '../shared/commonwebui.module';
import { UserBioDataFormPageComponent } from './user-biodata-setup/admin-biodata.component';

@NgModule({
  imports: [
    CommonModule,
    CommonwebuiModule,
    UtilModule,
    NgUploaderModule,
    ReactiveFormsModule,
    RouterModule,
    EntityServicesModule
  ],
  declarations: [UserBioDataFormPageComponent]
})
export class CommonWebPagesModule {}
