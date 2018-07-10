import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SchoolBiodataFormBase } from '../../../base/shared';

@Component({
  selector: 'app-student-biodata-form',
  templateUrl: './student-biodata-editor.html',
  styleUrls: ['./student-biodata-editor.component.scss']
})
export class StudentBiodataEditorComponent extends SchoolBiodataFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
