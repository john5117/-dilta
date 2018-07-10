import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SchoolBiodataFormBase } from '../../../base/shared';

/**
 * Management Biodata Component for displaying management
 * data and editing them simulatenoulsy
 */
@Component({
  selector: 'app-school-biodata-form',
  templateUrl: './school-biodata-editor.component.html',
  styleUrls: ['./school-biodata-editor.component.scss']
})
export class SchoolBiodataEditorComponent extends SchoolBiodataFormBase {
  constructor(fb: FormBuilder) {
    super(fb);
  }
}
