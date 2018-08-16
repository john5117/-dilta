import { Input, OnInit } from '@angular/core';

/**
 * interface for Dashboard Revenue Summary Input
 *
 * @export
 * @interface BusarRevenueSummary
 */
export interface BusarRevenueSummary {
  expectedTermSchoolFees: number;
  totalTermSchoolFees: number;
  currentMonthRevenue: number;
  currentMonthPercentage: number;
  previousMonthRevenue: number;
  highestMonthPercentage: number;
  currentMonthHighestClass: string;
  currentMonthHighestRevenue: number;
  currentMonthLowestClass: string;
  currentMonthLowestRevenue: number;
  currentMonthHighestCategory: string;
  currentMonthHighestCategoryRevenue: number;
}

/**
 * Base Class for BusarRevenueSummaryComponents
 *
 * @export
 * @class BusarRevenueSummaryBase
 * @implements {OnInit}
 */
export class BusarRevenueSummaryBase implements OnInit {
  @Input() public summary: BusarRevenueSummary;

  constructor() {}

  ngOnInit() {}
}
