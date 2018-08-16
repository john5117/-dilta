import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusaryEffects } from '@dilta/busar-base/src/lib/store';

export class BusarHomePageBase implements OnInit {
  constructor(private router: Router, private busary: BusaryEffects) {}

  changeRoute(url: string) {
    console.log(url);
    this.router.navigateByUrl(url);
  }

  search(input: string) {
    console.log(input);
  }

  ngOnInit() {
    this.busary.checkBusarySettings();
  }
}
