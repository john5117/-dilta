import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultKeys } from '@dilta/screwbox';

export interface School {
  id?: string;
  name: string;
  email: string;
  description: string;
  category: string;
  address: string;
  town: string;
  state: string;
}

export const objSchoolKeys = [
  'name',
  'email',
  'description',
  'category',
  'address',
  'town',
  'state'
];

/**
 * Management Biodata Component for displaying management
 * data and editing them simulatenoulsy
 */
@Component({
  selector: 'app-school-biodata-editor',
  templateUrl: './school-biodata-editor.component.html',
  styleUrls: ['./school-biodata-editor.component.scss']
})
export class SchoolBiodataEditorComponent implements OnInit {
  public static inputError = new Error(`expected a valid School Object as input
  for SchoolBiodataEditorComponent <school-biodata-editor></school-biodata-editor>`);

  @Input() public school: School = {} as any;
  @Output() public emitter = new EventEmitter();

  public schoolForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.schoolForm = this.form(this.school);
  }

  /**
   * initalize new forms from the input provided or
   * initalize new default forms if there is no input
   */
  public form(school?: School) {
    const { required } = Validators;
    if (!school) {
      school = defaultKeys(school, objSchoolKeys);
    }
    if (typeof school !== 'object') {
      throw SchoolBiodataEditorComponent.inputError;
    }
    return this.fb.group({
      name: [school.name, required],
      email: [school.email],
      description: [
        school.description,
        Validators.compose([
          required,
          Validators.minLength(60),
          Validators.maxLength(150)
        ])
      ],
      category: [school.category, required],
      address: [school.address, required],
      town: [school.town, required],
      state: [school.state, required]
    });
  }

  /**
   * emits the school value has an output binding
   * @param value school form value
   */
  public emit(value) {
    console.log(value);
    this.emitter.emit(value);
  }

  ngOnInit() {
    this.schoolForm = this.form(this.school);
  }
}
