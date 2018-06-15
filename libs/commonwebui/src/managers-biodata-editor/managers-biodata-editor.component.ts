import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultKeys } from '@dilta/screwbox';

export interface Manager {
  id?: string;
  propName: string;
  propPhone: string;
  propEmail: string;
  sMName: string;
  sMPhone: string;
  sMEmail: string;
  motto: string;
  school?: string;
}

export const objMangKeys = [
  'propName',
  'propPhone',
  'propEmail',
  'sMName',
  'sMPhone',
  'sMEmail',
  'motto'
];

/**
 * School Biodata Component for displaying school
 * data and editing them simulatenoulsy
 */
@Component({
  selector: 'app-managers-biodata-editor',
  templateUrl: './managers-biodata-editor.component.html',
  styleUrls: ['./managers-biodata-editor.component.scss']
})
export class ManagersBiodataEditorComponent implements OnInit {
  public static inputError = new Error(`expected an object of type Manager
  for ManagersBiodataEditorcomponent <managers-biodata-editor></managers-biodata-editor>`);

  public managersForm: FormGroup;

  @Input() public managers: Manager = {} as any;
  @Output() public emitter = new EventEmitter();

  constructor(private fb: FormBuilder) {
    // this.managersForm = this.form(this.managers);
  }

  /**
   * initalize new default forms if there is no input or
   * initalize new forms from the input provided
   */
  public form(value?: Manager) {
    const { required } = Validators;
    // confirming manager
    value = !value ? ({} as any) : value;
    console.log(value);
    //  checking managerType
    if (typeof value !== 'object') {
      throw ManagersBiodataEditorComponent.inputError;
    }
    console.log(value);
    return this.fb.group({
      propName: [value.propName, required],
      propPhone: [value.propPhone, required],
      propEmail: [value.propEmail],
      sMName: [value.sMName, required],
      sMPhone: [value.sMPhone, required],
      sMEmail: [value.sMEmail],
      motto: [value.motto, required]
    });
  }

  /**
   * emits the managers value has an output binding
   * @param value managers form value
   */
  private emit(value) {
    console.log(value);
    this.emitter.emit(value);
  }

  ngOnInit() {
    this.managersForm = this.form(this.managers);
  }
}
