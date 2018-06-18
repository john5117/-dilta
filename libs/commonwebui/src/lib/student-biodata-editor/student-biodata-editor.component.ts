import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultKeys } from '@dilta/screwbox';

export interface Student {
  name: string;
  age: number;
  class: string;
  gender: string;
  parentPhone: string;
  bloodgroup?: string;
  prevschool: string;
}

export const objStudentKeys = [
  'name',
  'class',
  'bloodgroup',
  'age',
  'gender',
  'prevschool',
  'parentPhone'
];

@Component({
  selector: 'app-student-biodata-editor',
  templateUrl: './student-biodata-editor.html',
  styleUrls: ['./student-biodata-editor.component.scss']
})
export class StudentBiodataEditorComponent {
  public static inputError = new Error(`expected a valid School Object as input for
  StudentBiodataEditorComponent <student-biodata-editor></student-biodata-editor>`);

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
      throw StudentBiodataEditorComponent.inputError;
    }
    return this.fb.group({
      name: [student.name, required],
      class: [student.class, required],
      bloodgroup: [student.bloodgroup],
      age: [student.age, required],
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
    console.log(value);
    this.emitter.emit(value);
  }
}
