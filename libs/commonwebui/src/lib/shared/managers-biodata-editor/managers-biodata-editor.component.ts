import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ManagersBiodataFormBase } from '@dilta/common-ui/src';

/**
 * School Biodata Component for displaying school
 * data and editing them simulatenoulsy
 */
@Component({
  selector: 'app-managers-biodata-form',
  templateUrl: './managers-biodata-editor.component.html',
  styleUrls: ['./managers-biodata-editor.component.scss']
})
export class ManagersBiodataEditorComponent extends ManagersBiodataFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
