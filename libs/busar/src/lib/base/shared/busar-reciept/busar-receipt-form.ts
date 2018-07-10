import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Receipt } from '@dilta/models';
import { confirmRequiredKeys, defaultKeys, errorInvalid, errorNotAndObject, getProp } from '@dilta/screwbox';
import { isEmpty } from 'lodash';



// interface Receipt {
//   name: string;
//   date: string | Date;
//   amount: number;
//   teacherId: string;
//   teacherName: string;
//   studentId: string;
//   universalId: string;
//   session: string;
//   term: string;
//   class: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// Reciept Object Keys
export const recieptKeys = [
  'name',
  'date',
  'amount',
  'teacherId',
  'teacherName',
  'studentId',
  'session',
  'term',
  'createdAt',
  'updatedAt',
  'class'
];

interface Collector {
  universalId: string;
  name: string;
}

// teacher Object Keys
const collectorKeys = ['universalId', 'name'];

export class BusarReceiptFormBase implements OnInit {
  public static RECIEPTINPUTERROR = new Error(`invalid receipt object given
  :<busar-receipt-editor></busar-receipt-editor>`);
  public static SESSIONLISTINPUTERROR = new Error(`expected sessionList Input
  to be a valid array:<busar-receipt-editor></busar-receipt-editor>`);
  public static TERMSLISTINPUTERROR = new Error(`expected termsList Input to
  be a valid array :<busar-receipt-editor></busar-receipt-editor>`);
  public static CLASSLISTINPUTERROR = new Error(`expected classList Input to
  be a valid array :<busar-receipt-editor></busar-receipt-editor>`);
  public static TEACHERINPUTERROR = new Error(`expected teacher property to
  have universalId and name properties`);

  @Input() public teacher = ({} as any) as Collector;
  @Input() public reciept: Receipt = {} as any;
  @Input() public termsList: string[] = [];
  @Input() public classList: string[] = [];
  @Input() public sessionList: string[] = [];

  @Output() public evntEmitter = new EventEmitter();

  public recieptForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recieptForm = this.form(this.reciept);
  }

  /**
   * @param reciept [string] receipt object to return a formgroup
   */
  public form(reciept?: Receipt) {
    const { required } = Validators;
    if (!reciept) {
      reciept = defaultKeys(reciept, recieptKeys);
    }
    errorNotAndObject(reciept, BusarReceiptFormBase.RECIEPTINPUTERROR);
    return this.fb.group({
      name: [reciept.name, required],
      date: [reciept.date, required],
      amount: [reciept.amount, required],
      class: [reciept.class, required],
      studentId: [reciept.studentId, required],
      session: [reciept.session, required],
      term: [reciept.term, required],
      createdAt: [reciept.createdAt || Date(), required],
      updatedAt: [Date(), required]
    });
  }

  public emit(envt: Receipt) {
    envt.teacherId = this.teacher.universalId || this.reciept.teacherId;
    envt.teacherName = this.teacher.name || this.reciept.teacherName;
    this.evntEmitter.emit(envt);
    console.log(envt);
  }

  public errorDetector() {
    errorInvalid(
      !isEmpty(this.sessionList),
      BusarReceiptFormBase.SESSIONLISTINPUTERROR
    );
    errorInvalid(
      !isEmpty(this.termsList),
      BusarReceiptFormBase.TERMSLISTINPUTERROR
    );
    if (this.reciept) {
      errorInvalid(
        getProp(this.reciept, 'teacherId') &&
          getProp(this.reciept, 'teacherName'),
        BusarReceiptFormBase.RECIEPTINPUTERROR
      );
    }
    confirmRequiredKeys(
      this.teacher,
      collectorKeys,
      `teacher:Constructor:BusarReceiptFormBase`
    );
  }

  public ngOnInit() {
    this.errorDetector();
  }
}
