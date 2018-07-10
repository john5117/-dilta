import { EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Navs {
  name: string;
  url: string;
}

/**
 * the Base for nabar navigation for the busar.
 *
 * @export
 * @class BusarNavBarBase
 */
export class BusarNavBarBase implements OnInit {


  /**
   * Pages Navigation for busar ...follows index
   *
   * @memberof BusarNavBarBase
   */
  @Input() mainNavs: Navs[] = [
    { name: 'Analytics', url: 'analytics' },
    { name: 'Expenditure', url: 'expenditure' },
    { name: 'Revenue', url: 'revenue' },
    { name: 'Financial Report', url: 'report' },
    // { name: 'Dashboard', url: '#' }
  ];

  /**
   * hidden navs under user profile
   *
   * @memberof BusarNavBarBase
   */
  @Input() profileSubNavs: Navs[] = [
    { name: 'Profile', url: 'profile' },
    { name: 'Preferences', url: 'settings' },
    { name: 'About', url: 'about' },
    { name: 'Log out', url: 'logout' }
  ];

  /**
   * event listened to for route changing.
   *
   * @memberof BusarNavBarBase
   */
  @Output() route = new EventEmitter();


  /**
   * emit events for search
   *
   * @memberof BusarNavBarBase
   */
  @Output() search = new EventEmitter();

  constructor() {}


  ngOnInit() {}
}
