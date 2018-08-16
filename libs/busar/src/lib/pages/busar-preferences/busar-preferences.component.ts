import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BusarPreferencesPageBase } from '@dilta/busar-base';
import { Store } from '@ngrx/store';

@Component({
  selector: 'busar-preferences',
  templateUrl: './busar-preferences.component.html',
  styleUrls: ['./busar-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusarPreferencesComponent extends BusarPreferencesPageBase {
  constructor(store: Store<any>) {
    super(store);
  }
}
