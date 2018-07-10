import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserBiodataEditorFormBase } from '../../../base/shared';

@Component({
  selector: 'app-user-biodata-form',
  templateUrl: 'admin-biodata-editor.component.html',
  styleUrls: ['./admin-biodata-editor.component.scss']
})
export class AdminBiodataEditorComponent extends UserBiodataEditorFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
