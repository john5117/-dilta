import { Component } from '@angular/core';
import { BusarRevenueSummaryBase } from '../../../base/shared';

@Component({
  selector: 'busar-revenue-summary',
  templateUrl: './busar-revenue-summary.component.html',
  styleUrls: ['./busar-revenue-summary.component.scss']
})
export class BusarRevenueSummaryComponent extends BusarRevenueSummaryBase {

  constructor() {
    super();
   }

}
