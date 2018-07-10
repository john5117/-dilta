import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class BusarHomePageBase implements OnInit {

  constructor(private router: Router) { }

  changeRoute(url: string) {
    console.log(url);
    this.router.navigateByUrl(url);
  }

  search(input: string) {
    console.log(input);
  }

  ngOnInit() {

  }
}
