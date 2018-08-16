import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UtilService } from '@dilta/util/src/lib/util.service';

@NgModule({
  imports: [CommonModule],
  providers: [UtilService]
})
export class UtilModule {}
