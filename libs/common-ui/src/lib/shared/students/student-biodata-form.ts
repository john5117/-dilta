import { EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '@dilta/models';
import { defaultKeys } from '@dilta/screwbox';

export const objStudentKeys = [
  'name',
  'class',
  'bloodgroup',
  'age',
  'gender',
  'prevschool',
  'parentPhone'
];

export class StudentBiodataFormBase {
  public static inputError = new Error(`expected a valid School Object as input for
  StudentBiodataFormBase <app-student-biodata-form></app-student-biodata-form>`);

  @Input() public student: Student = {} as any;
  @Output() public emitter = new EventEmitter();

  public studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.form(this.student);
  }

  /**
   * initalize new forms from the input provided or
   * initalize new default forms if there is no input
   */
  public form(student?: Student) {
    const { required } = Validators;
    if (!student) {
      student = defaultKeys(student, objStudentKeys);
    }
    if (typeof student !== 'object') {
      throw StudentBiodataFormBase.inputError;
    }
    return this.fb.group({
      name: [student.name, required],
      class: [student.class, required],
      bloodgroup: [student.bloodgroup],
      dob: [student.dob, required],
      gender: [student.gender, required],
      prevschool: [student.prevschool, required],
      parentPhone: [student.parentPhone, required]
    });
  }

  /**
   * emits the student value has an output binding
   * @param value student form value
   */
  public emit(value: Student) {
    this.emitter.emit(value);
  }
}
