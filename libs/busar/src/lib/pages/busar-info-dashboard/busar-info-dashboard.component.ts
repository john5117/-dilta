import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BusarDashBoardBase } from '@dilta/busar-base';
import { Store } from '@ngrx/store';
import { SchoolService } from '@dilta/store';
import { Router } from '@angular/router';

@Component({
  selector: 'busar-info-dashboard',
  templateUrl: './busar-info-dashboard.component.html',
  styleUrls: ['./busar-info-dashboard.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusarInfoDashboardComponent extends BusarDashBoardBase {
  /**
   * overlay any routes over the current page has a modal
   *
   * @memberof BusarInfoDashboardComponent
   */
  showOverlay = false;

  constructor(store: Store<any>, school: SchoolService, router: Router) {
    super(store, school, router);
  }

  closeModal() {
    console.log('closing modal');
  }
}
