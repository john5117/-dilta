import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { School } from '@dilta/models';
import { defaultKeys, fileBase64, errorInvalid } from '@dilta/screwbox';
import { UploadInput } from 'ngx-uploader';
import { isEmpty } from 'lodash';

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

export class SchoolBiodataFormBase implements OnInit {
  public static inputError = new Error(`expected a valid School Object as input
  for SchoolBiodataFormBase <school-biodata-form></school-biodata-form>`);
  public static statesError = new Error(`expected states Input to
  be a valid array of states name :<school-biodata-form></school-biodata-form>`);
  public static lgasError = new Error(`expected lgas Input to
  be a valid array of lgas names :<school-biodata-form></school-biodata-form>`);
  public static catgeorysError = new Error(`expected categorys Input to
  be a valid array of school categorys names :<school-biodata-form></school-biodata-form>`);

  @Input() public school: School;
  @Input() public states: string[] = [];
  @Input() public lgas: string[] = [];
  @Input() public categorys: string[] = [];

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
   * does error validations
   *
   * @memberof BusarReceiptFormBase
   */
  public errorDetector() {
    errorInvalid(!isEmpty(this.states), SchoolBiodataFormBase.statesError);
    errorInvalid(!isEmpty(this.lgas), SchoolBiodataFormBase.lgasError);
    errorInvalid(
      !isEmpty(this.categorys),
      SchoolBiodataFormBase.catgeorysError
    );
  }

  /**
   * initalize new forms from the input provided or
   * initalize new default forms if there is no input
   */
  public form(school?: School) {
    const { required } = Validators;
    if (!school) {
      school = defaultKeys({}, objSchoolKeys);
    }
    if (typeof school !== 'object') {
      throw SchoolBiodataFormBase.inputError;
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
    this.emitter.emit(value);
  }

  ngOnInit() {
    this.errorDetector();
    this.schoolForm = this.form(this.school);
  }
}
