import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusarRecieptFormPageBase } from '@dilta/busar-base';
import { RouterState } from '@dilta/common-ui';
import { ReceiptService, SchoolService } from '@dilta/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'busar-reciept-form-web',
  templateUrl: './busar-reciept-form-page.component.html',
  styleUrls: ['./busar-reciept-form-page.component.scss']
})
export class BusarRecieptWebFormComponent extends BusarRecieptFormPageBase
  implements OnInit {
  displayRecieptForm = true;
  constructor(
    store: Store<any>,
    school: SchoolService,
    reciptSvc: ReceiptService,
    route: ActivatedRoute,
    public router: Router,
    public routerState: RouterState
  ) {
    super(school, store, route, router, reciptSvc);
  }

  goback() {
    this.router.navigateByUrl(this.routerState.getPreviousUrl());
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
