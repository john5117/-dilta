import { Component } from '@angular/core';
import { ReactivePreferenceListBase } from '../../../base/shared';


@Component({
  selector: 'app-preferences-list',
  templateUrl: './preferences-list.component.html',
  styleUrls: ['./preferences-list.component.scss']
})
export class PreferencesFormListComponent extends ReactivePreferenceListBase {

  constructor() {
    super();
  }

}
