import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense, User } from '@dilta/models';
import {
  confirmRequiredKeys,
  defaultKeys,
  errorInvalid,
  errorNotAndObject,
  getProp
} from '@dilta/screwbox';
import { isEmpty } from 'lodash';

// expense Object Keys
export const expenseKeys = [
  'name',
  'date',
  'amount',
  'busarId',
  'name',
  'studentId',
  'session',
  'term',
  'createdAt',
  'updatedAt',
  'class'
];

// busar Object Keys
export const collectorKeys = ['id', 'name'];

export class BusarExpenseFormBase implements OnInit {
  public static BUSAREXPENSEINPUTERROR = new Error(`invalid Expense object given
  :<busar-expense-form></busar-expense-form>`);
  public static SESSIONLISTINPUTERROR = new Error(`expected sessionList Input
  to be a valid array:<busar-expense-form></busar-expense-form>`);
  public static TERMSLISTINPUTERROR = new Error(`expected termsList Input to
  be a valid array :<busar-expense-form></busar-expense-form>`);
  public static CLASSLISTINPUTERROR = new Error(`expected classList Input to
  be a valid array :<busar-expense-form></busar-expense-form>`);
  public static BUSARINPUTERROR = new Error(`expected busar property to
  have id and name properties`);

  @Input() public busar;
  @Input() public expense: Expense = {} as any;
  @Input() public termsList: string[] = [];
  @Input() public sessionList: string[] = [];

  @Output() public evntEmitter = new EventEmitter();

  public expenseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.form(this.expense);
  }

  /**
   * @param expense [string] Expense object to return a formgroup
   */
  public form(expense?: Expense) {
    const { required } = Validators;
    if (!expense) {
      expense = defaultKeys({}, expenseKeys);
    }
    errorNotAndObject(expense, BusarExpenseFormBase.BUSAREXPENSEINPUTERROR);
    return this.fb.group({
      name: [expense.name, required],
      date: [expense.date, required],
      amount: [expense.amount, required],
      studentId: [expense.busarId, required],
      session: [expense.session, required],
      purpose: [expense.purpose],
      capital: [expense.capital || false],
      category: [expense.category],
      term: [expense.term, required],
      createdAt: [expense.createdAt || Date(), required],
      updatedAt: [Date(), required]
    });
  }

  public emit(envt: Expense) {
    envt.busarId = this.busar.id || this.expense.busarId;
    envt.name = this.busar.name || this.expense.name;
    this.evntEmitter.emit(envt);
  }

  public errorDetector() {
    errorInvalid(
      !isEmpty(this.sessionList),
      BusarExpenseFormBase.SESSIONLISTINPUTERROR
    );
    errorInvalid(
      !isEmpty(this.termsList),
      BusarExpenseFormBase.TERMSLISTINPUTERROR
    );
    if (this.expense) {
      errorInvalid(
        getProp(this.expense, 'busarId') && getProp(this.expense, 'name'),
        BusarExpenseFormBase.BUSAREXPENSEINPUTERROR
      );
    }
    confirmRequiredKeys(
      this.busar,
      collectorKeys,
      `busar:Constructor:BusarExpenseFormBase`
    );
  }

  public ngOnInit() {
    this.errorDetector();
  }
}
