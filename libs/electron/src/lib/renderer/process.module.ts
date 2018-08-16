import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { ProcessEffectService } from '@dilta/electron/src/lib/renderer/process.service';

@NgModule({
  imports: [NgxElectronModule],
  exports: [],
  declarations: [],
  providers: [ProcessEffectService]
})
export class ElectronProcessModule {}
