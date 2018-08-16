import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusarHomePageBase, BusaryEffects } from '@dilta/busar-base';

@Component({
  // selector: 'busar-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class BusarHomePageComponent extends BusarHomePageBase {
  constructor(router: Router, busarEffect: BusaryEffects) {
    super(router, busarEffect);
  }
}
