import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Receipt, User } from '@dilta/models';
import { confirmRequiredKeys, defaultKeys, errorInvalid, errorNotAndObject, getProp } from '@dilta/screwbox';
import { isEmpty } from 'lodash';

// Reciept Object Keys
export const recieptKeys = [
  'name',
  'date',
  'amount',
  'teacherId',
  'studentId',
  'session',
  'term',
  'createdAt',
  'updatedAt',
  'class'
];

// teacher Object Keys
const collectorKeys = ['id', 'name'];

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
  have id and name properties`);

  @Input() public teacher = ({} as any) as User;
  @Input() public reciept: Receipt;
  @Input() public termsList: string[] = [];
  @Input() public classList: string[] = [];
  @Input() public sessionList: string[] = [];
  @Input() public paymentOptions: string[] = [];

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
      reciept = defaultKeys({}, recieptKeys);
    }
    errorNotAndObject(reciept, BusarReceiptFormBase.RECIEPTINPUTERROR);
    return this.fb.group({
      name: [reciept.name, required],
      date: [reciept.date, required],
      studentId: [reciept.studentId, required],
      class: [reciept.class || this.classList[0], required],
      session: [reciept.session || this.sessionList[0], required],
      term: [reciept.term || this.termsList[0], required],
      createdAt: [reciept.createdAt || Date(), required],
      updatedAt: [Date(), required]
    });
  }

  /**
   * remaps and emit the reciept
   *
   * @param {Receipt} envt
   * @memberof BusarReceiptFormBase
   */
  public emit(envt: Receipt) {
    envt.teacherId = this.teacher.id || this.reciept.teacherId;
    this.evntEmitter.emit(envt);
  }

  /**
   * does error validations
   *
   * @memberof BusarReceiptFormBase
   */
  public errorDetector() {
    // if (false) {
    //   errorInvalid(
    //     !isEmpty(this.sessionList),
    //     BusarReceiptFormBase.SESSIONLISTINPUTERROR
    //   );
    // }

    // if (false) {
    //   errorInvalid(
    //     !isEmpty(this.termsList),
    //     BusarReceiptFormBase.TERMSLISTINPUTERROR
    //   );
    // }

    if (!isEmpty(this.teacher)) {
      confirmRequiredKeys(
        this.teacher,
        collectorKeys,
        `teacher:Constructor:BusarReceiptFormBase`
      );
    }

    if (this.reciept) {
      errorInvalid(
        getProp(this.reciept, 'teacherId') &&
          getProp(this.reciept, 'teacherName'),
        BusarReceiptFormBase.RECIEPTINPUTERROR
      );
    }
  }

  public ngOnInit() {
    this.errorDetector();
  }
}
