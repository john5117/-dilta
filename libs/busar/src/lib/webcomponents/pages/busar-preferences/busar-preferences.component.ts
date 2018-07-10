import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BusarPreferencesPageBase } from '../../../base/pages';

@Component({
  selector: 'busar-preferences',
  templateUrl: './busar-preferences.component.html',
  styleUrls: ['./busar-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusarPreferencesComponent extends BusarPreferencesPageBase {

  constructor() {
    super();
  }

}
