import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactivePreferenceBase } from '../../../base/shared';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './app-preferences-form.component.html',
  styleUrls: ['./app-preferences-form.component.scss']
})
export class PreferencesFormComponent extends ReactivePreferenceBase {

  constructor(fb: FormBuilder) {
    super(fb);
  }

}
