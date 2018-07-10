import { Component } from '@angular/core';
import { SideBarBase } from '../../../base/shared';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent extends SideBarBase {

  constructor() {
    super();
   }

}
