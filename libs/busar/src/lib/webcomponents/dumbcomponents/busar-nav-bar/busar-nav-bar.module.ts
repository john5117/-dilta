import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { BusarNavBarComponent } from './busar-nav-bar.component';


@NgModule({
  imports: [CommonModule, ClarityModule],
  exports: [BusarNavBarComponent],
  declarations: [BusarNavBarComponent],
})
export class BusarNavBarModule { }
