import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BusarDumbsModule } from '../../dumbcomponents';
import { BusarHomePageComponent } from './home-page.component';

@NgModule({
  imports: [CommonModule, BusarDumbsModule],
  declarations: []
})
export class BusarHomePageModule {
  public static RootComponent = BusarHomePageComponent;
}
