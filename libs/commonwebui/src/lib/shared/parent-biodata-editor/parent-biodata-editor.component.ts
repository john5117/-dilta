import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ParentBiodataFormBase } from '@dilta/common-ui/src';

@Component({
  selector: 'app-parent-biodata-form',
  templateUrl: './parent-biodata-editor.component.html',
  styleUrls: ['./parent-biodata-editor.component.scss']
})
export class ParentBiodataEditorComponent extends ParentBiodataFormBase {
  constructor(fb: FormBuilder) {
    // sets intial and for testing
    super(fb);
  }
}
