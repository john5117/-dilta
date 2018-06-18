import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { ProcessEffectService } from './process.service';

@NgModule({
  imports: [NgxElectronModule],
  exports: [],
  declarations: [],
  providers: [ProcessEffectService]
})
export class ElectronProcessModule {}
