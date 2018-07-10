import { Input, OnInit } from '@angular/core';


/**
 * input BusarExpenseSummary expenses input for BusarExpenseSummaryComponent
 *
 * @export
 * @interface BusarExpenseSummary
 */
export interface BusarExpenseSummary {
  totalTerm: number;
  currentMonth: number;
  preivousMonth: number;
  currentMonthCapital: number;
  currentMonthRecurrent: number;
  currentMonthHighestCategory: string;
  currentMonthLowestCategory: string;
  currentMonthHighestCategoryExpense: number;
  currentMonthLowestCategoryExpense: number;
}

export class BusarExpenseSummaryBase implements OnInit {

  @Input() summary: BusarExpenseSummary;
  constructor() { }

  ngOnInit() { }
}
