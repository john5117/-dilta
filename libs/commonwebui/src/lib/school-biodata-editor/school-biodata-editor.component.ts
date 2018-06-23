import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultKeys, fileBase64 } from '@dilta/screwbox';
import { UploadInput } from 'ngx-uploader';

export interface School {
  id?: string;
  logo?: string;
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
  'state',
  'logo'
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

  // additional configuration for file uploads
  @Input() public uploadOptions = {};

  public uploadInput = new EventEmitter<UploadInput>();

  public schoolForm: FormGroup;
  public img: string;

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
      state: [school.state, required],
      logo: [school.logo, required]
    });
  }

  /**
   * fil(event)
   * @param event an uploading event containing
   * image file to be uploaded
   */
  async fil(event) {
    const _evnt = event ? event.nativeFile : undefined;
    this.setImg(await fileBase64(_evnt));
  }

  /**
   * setImg(img)
   * @param img base64 of an image
   * sets the img to display to the display
   * and sets the form image value
   */
  setImg(img) {
    this.img = img;
    this.schoolForm.get('logo').setValue(this.img);
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
