import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StudentBiodataFormBase } from '@dilta/common-ui/src';

@Component({
  selector: 'app-student-biodata-form',
  templateUrl: './student-biodata-editor.html',
  styleUrls: ['./student-biodata-editor.component.scss']
})
export class StudentBiodataEditorComponent extends StudentBiodataFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
