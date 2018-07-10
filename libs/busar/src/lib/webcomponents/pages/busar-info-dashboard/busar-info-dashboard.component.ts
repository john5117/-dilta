import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BusarDashBoardBase } from '../../../base/pages/dash-board';

@Component({
  selector: 'busar-info-dashboard',
  templateUrl: './busar-info-dashboard.component.html',
  styleUrls: ['./busar-info-dashboard.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusarInfoDashboardComponent extends BusarDashBoardBase implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
