import { Component } from '@angular/core';
import { BusarNavBarBase } from '../../../base';

@Component({
  selector: 'busar-nav-bar',
  templateUrl: './busar-nav-bar.component.html',
  styleUrls: ['./busar-nav-bar.component.scss']
})
export class BusarNavBarComponent extends BusarNavBarBase  {

  constructor() {
    super();
  }

}
