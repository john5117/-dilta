import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UtilModule } from '@dilta/util';
import { NgUploaderModule } from 'ngx-uploader';
import { CommonwebuiModule } from '../shared/commonwebui.module';

@NgModule({
  imports: [
    CommonModule,
    CommonwebuiModule,
    UtilModule,
    NgUploaderModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: []
})
export class CommonWebPagesModule {}
