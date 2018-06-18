import { Component, DebugElement } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { omit, pick } from 'lodash';

import {
  SchoolReceiptEditorComponent,
  collectorKeys,
  recieptKeys
} from './school-receipt-editor.component';
import { SchoolRecieptEditorModule } from './school-receipt-editor.module';

import { receipt } from '@dilta/screwbox/src/gen.faker';
import * as compose from '@dilta/screwbox';

describe(`SchoolReceiptEditorComponent: unit tests`, async () => {
  const teacher = {
    universalId: 'myreandomTeacher',
    name: 'Mr Random'
  };
  const sessionList = ['2016/2017', '2018/2019', '2015/2016'];
  const termList = ['first term', 'second term', 'third term'];
  const classList = [
    'pry1',
    'pry2',
    'pry3',
    'pry4',
    'pry5',
    'pry6',
    'nus1',
    'nus2',
    'nus3'
  ];

  describe(`internal assignments`, () => {
    let fixture: ComponentFixture<SchoolReceiptEditorComponent>;
    let editor: SchoolReceiptEditorComponent;
    let modifiedCompt: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolRecieptEditorModule]
      }).compileComponents();

      modifiedCompt = SchoolReceiptEditorComponent;
      modifiedCompt.prototype.ngOnInit = () => {};

      fixture = TestBed.createComponent(modifiedCompt);
      editor = fixture.componentInstance;
    });

    function setEditor() {
      editor.classList = classList;
      editor.sessionList = sessionList;
      editor.termsList = termList;
      editor.teacher = teacher;
    }

    it('should have created from with empty inputs', () => {
      editor.teacher = teacher;
      fixture.detectChanges();
      // should be false untouched
      expect(editor.recieptForm.valid).toBe(false);
      let value = compose.defaultKeys({}, recieptKeys);
      const formVal = omit(editor.recieptForm.value, [
        'updatedAt',
        'createdAt'
      ]);
      value = omit(value, [
        'updatedAt',
        'createdAt',
        'teacherId',
        'teacherName'
      ]);
      expect(formVal).toEqual(value);
    });

    it('should create a new form with old data', () => {
      setEditor();
      const _receipt = receipt();
      editor.recieptForm = editor.form(_receipt);
      fixture.detectChanges();
      // inputed input is expected to be valid
      expect(editor.recieptForm.valid).toBe(true);
    });

    it('should throw an error if invalid primitive type is passed', () => {
      setEditor();
      fixture.detectChanges();
      expect(() => editor.form('string' as any)).toThrowError(
        SchoolReceiptEditorComponent.RECIEPTINPUTERROR.message
      );
    });
  });

  describe(`custom internal error`, () => {
    let fixture: ComponentFixture<SchoolReceiptEditorComponent>;
    let editor: SchoolReceiptEditorComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchoolRecieptEditorModule]
      }).compileComponents();

      fixture = TestBed.createComponent(SchoolReceiptEditorComponent);
      editor = fixture.componentInstance;
    });

    it('should throw an error for empty session list', () => {
      expect(() => editor.errorDetector()).toThrowError(
        SchoolReceiptEditorComponent.SESSIONLISTINPUTERROR.message
      );
    });

    it('should throw an error for empty term list', () => {
      editor.sessionList = sessionList;
      fixture.detectChanges();
      expect(() => editor.errorDetector()).toThrowError(
        SchoolReceiptEditorComponent.TERMSLISTINPUTERROR.message
      );
    });

    it('should throw an error for invalid receipt without collector', () => {
      editor.sessionList = sessionList;
      editor.termsList = termList;
      editor.reciept = {} as any;
      fixture.detectChanges();
      expect(() => editor.errorDetector()).toThrowError(
        SchoolReceiptEditorComponent.RECIEPTINPUTERROR.message
      );
    });
  });
});

// <---- dom based testing; ---->

// conditional
@Component({
  template: `
  <app-school-receipt-editor (evntEmitter)="logger($event)"
   [teacher]="teacher" [sessionList]="sessions"
    [termsList]="terms"></app-school-receipt-editor>`,
  selector: `app-test-manager-editor`
})
class TSchoolReceiptEditorComponent {
  public teacher = {
    universalId: 'myreandomTeacher',
    name: 'Mr Random'
  };
  sessions = ['2016/2017', '2017/2018', '2018/2019'];
  terms = ['first term', 'second term', 'third term'];
  logger(type, event) {
    console.log(type, event);
  }
}

const dynamic = document ? describe : xdescribe;

dynamic('SchoolReceiptEditorComponent: integration tests', () => {
  let fixture: ComponentFixture<TSchoolReceiptEditorComponent>;
  let editor: TSchoolReceiptEditorComponent;
  let el: HTMLElement;
  const cssBtn = 'form div button';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SchoolRecieptEditorModule],
      declarations: [TSchoolReceiptEditorComponent]
    });

    fixture = TestBed.createComponent(TSchoolReceiptEditorComponent);
    editor = fixture.componentInstance;
  });

  it(
    'should hide the save button if form is invalid',
    fakeAsync(() => {
      editor.teacher = {
        universalId: 'myreandomTeacher',
        name: 'Mr Random'
      };
      fixture.detectChanges();
      tick(100);
      el = fixture.debugElement.query(By.css(cssBtn)).nativeElement;
      // expects that the save button is disabled for an invalid form
      expect((el as any).disabled).toBe(true);
    })
  );
});
