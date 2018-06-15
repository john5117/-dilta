import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { colorSets } from '@swimlane/ngx-charts/release/utils';
import { difference } from 'lodash';
import {
  quaitave,
  single,
  series,
  Single,
  Series,
  seriesQuaitave
} from '@dilta/screwbox';

/**
 * interface for each field and the corresponding data
 * type and operations to be done on it
 *
 * @export
 * @interface ChartFieldConfig
 */
export interface ChartFieldConfig {
  field: string; // the field name
  type: string; // field type
}

/**
 * charts options that can be overide through
 * component Inputs
 *
 * @export
 * @interface ChartInput
 */
export interface ChartInput {
  animations: boolean;
  legend: boolean;
  xAxis: boolean;
  yAxis: boolean;
  showGridLines: boolean;
  showxAxisLabel: boolean;
  showYAxisLabel: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  roundDomains: boolean;
  barPadding: number;
  tooltipDisabled: boolean;
  gradient: boolean;
  view: number[];
  schemeType: string;
  scheme: string[];
}

/**
 * default chartInput Values
 */
const chartInput: Partial<ChartInput> = {
  scheme: colorSets[0].domain,
  schemeType: 'ordinal',
  animations: true,
  xAxis: true,
  yAxis: true,
  legend: true,
  gradient: false,
  view: [600, 360]
};

export interface ChartObject {
  results?: Single[] | Series[];
  scheme: string[];
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartsComponent implements OnInit {
  /**
   * the current selected chart group used to select
   * charts options to diplay and data cleaning functionality
   *
   * @public
   * @memberof ChartsComponent
   */
  @Input() public currentChartGroup = 'single';

  /**
   * the currently selected chartType being displayed
   * @public
   * @memberof ChartsComponent
   */
  @Input() public currentChartType = 'BarVerticalComponent';

  /**
   * the currently selected color scheme domain
   *
   * @type {string[]}
   * @memberof ChartsComponent
   */
  @Input() public currentColorScheme = colorSets[0];

  /**
   * configurations to overide default configurations
   *
   * @type {ChartInput}
   * @memberof ChartsComponent
   */
  @Input() public config: ChartInput = {} as any;

  /**
   * field configuration of keys and expected data type
   * to determine operation to be performed
   *
   * @type {ChartFieldConfig[]}
   * @memberof ChartsComponent
   */
  @Input() public keys: ChartFieldConfig[] = [];
  /**
   * array of data to the transmutated and plotted
   *
   * @type {any[]}
   * @memberof ChartsComponent
   */
  @Input() public data: any[] = [];

  /**
   * an array of the type of chart group
   * supported
   *
   * @memberof ChartsComponent
   */
  public chartGroups = ['single', 'series'];

  /**
   * an array of string representation of charts components allowed
   *
   * @memberof ChartsComponent
   */
  public chartTypes = [
    { name: 'BarVerticalComponent', type: 'single' },
    { name: 'BarHorizontalComponent', type: 'single' },
    // { name: 'AdvancedPieChartComponent', type: 'single' },
    { name: 'PieChartComponent', type: 'single' },
    { name: 'GaugeArcComponent', type: 'single' },
    // { name: 'BubbleChartComponent', type: 'single' },
    { name: 'SeriesHorizontalComponent', type: 'series' },
    { name: 'SeriesVerticalComponent', type: 'series' },
    { name: 'SeriesHorizontalStackedComponent', type: 'series' },
    { name: 'SeriesVerticalStackedComponent', type: 'series' },
    { name: 'LineChartComponent', type: 'series' },
    { name: 'GaugeArcComponent', type: 'series' }
  ];

  /**
   * an array of currently displayed displayed chart
   * types available for selection
   *
   * @memberof ChartsComponent
   */
  public displayedChartTypes = [];

  /**
   * array of key mapped data passed to the charts
   * components
   *
   * @memberof ChartsComponent
   */
  public results = [];

  /**
   * available color sets for components colors
   *
   * @memberof ChartsComponent
   */
  public colorSchemes = colorSets.map(e => e.name);
  /**
   * holds the current key used to group the series
   *
   * @memberof ChartsComponent
   */
  public seriesGroupBy = '';

  // public view: ChartInput & ChartObject;
  constructor() {}
  /**
   * sets the confifuration and overide defaults
   *
   * @param {{}} config configuration to overide the default
   * @returns
   * @memberof ChartsComponent
   */
  configureConfig(config: {}) {
    return Object.assign({}, chartInput, config);
  }
  /**
   * edits the configuration key value map
   * and triggers plot when certain conditions are
   * met
   *
   * @param {string} key
   * @param {string} value
   * @param {boolean} [trigger=true]
   * @memberof ChartsComponent
   */
  editConfig(key: string, value: string, trigger = true) {
    this.config[key] = value;
    if (trigger) {
      if (key === 'xAxisLabel' || key === 'yAxisLabel') {
        this.plotChart();
      }
    }
  }

  changeview(index: number, value: number) {
    index = parseInt(index as any, 10);
    value = parseInt(value as any, 10);
    this.config.view[index] = value;
    this.plotChart();
  }

  /**
   * sets the current chart type being displayed
   *
   * @param {string} type
   * @memberof ChartsComponent
   */
  setCurrentChartType(type: string) {
    this.currentChartType = type;
  }

  /**
   * sets the color scheme for the components
   * charts
   *
   * @param {string} name
   * @memberof ChartsComponent
   */
  setColorScheme(name: string) {
    let index = this.colorSchemes.indexOf(name);
    index = index > -1 ? index : 0;
    this.currentColorScheme = colorSets[index];
  }

  /**
   * this confiures the chartsa available for
   * displayed with the type value
   *
   * @param {string} type i.e 'single'
   * @memberof ChartsComponent
   */
  configureChartDisplay(type: string) {
    this.displayedChartTypes = this.chartTypes
      .filter(e => e.type === type)
      .map(e => e.name);
    this.currentChartGroup = type;
    this.setCurrentChartType(this.displayedChartTypes[0]);
    this.plotChart();
  }
  /**
   * helps to the determine if the value [yAxisLabel] is not numeric
   *
   * @returns
   * @memberof ChartsComponent
   */
  fieldIsQuavaite() {
    let isQuavaite = false;
    const { xAxisLabel, yAxisLabel } = this.config;
    const yAxisKey = this.keys.filter(e => e.field === yAxisLabel)[0];
    if (yAxisKey) {
      isQuavaite = yAxisKey.type === 'string';
    }
    return isQuavaite;
  }
  /**
   * returns a valid single array or quaivated one
   *
   * @param {any[]} data
   * @param {string} xAxisLabel
   * @param {string} yAxisLabel
   * @param {boolean} isQuavaite
   * @returns
   * @memberof ChartsComponent
   */
  plotSingle(
    data: any[],
    xAxisLabel: string,
    yAxisLabel: string,
    isQuavaite: boolean
  ) {
    return !isQuavaite
      ? single(data, {
          name: xAxisLabel,
          value: yAxisLabel
        })
      : quaitave(data, xAxisLabel, yAxisLabel);
  }

  setSeriesGroupBy(value: string) {
    console.log(this.seriesGroupBy, value);
    this.seriesGroupBy = value;
    this.plotChart();
  }
  /**
   * returns a series array or a series quaivated array
   *
   * @param {any[]} data
   * @param {string} xAxisLabel
   * @param {string} yAxisLabel
   * @param {boolean} isQuavaite
   * @returns
   * @memberof ChartsComponent
   */
  plotSeries(
    data: any[],
    xAxisLabel: string,
    yAxisLabel: string,
    isQuavaite: boolean
  ) {
    return !isQuavaite
      ? series(data, {
          name: this.seriesGroupBy,
          series: {
            name: xAxisLabel,
            value: yAxisLabel
          }
        })
      : seriesQuaitave(data, {
          name: this.seriesGroupBy,
          series: {
            name: xAxisLabel,
            value: yAxisLabel,
            map: e => e[yAxisLabel]
          }
        });
  }

  /**
   * plots the update chat to the view
   *
   * @memberof ChartsComponent
   */
  plotChart() {
    const { xAxisLabel, yAxisLabel } = this.config;
    const isQuavaite = this.fieldIsQuavaite();
    console.log(isQuavaite);

    if (this.currentChartGroup === 'single') {
      this.results = this.plotSingle(
        this.data,
        xAxisLabel,
        yAxisLabel,
        isQuavaite
      );
    }
    if (this.currentChartGroup === 'series') {
      this.results = this.plotSeries(
        this.data,
        xAxisLabel,
        yAxisLabel,
        isQuavaite
      );
      console.log(this.results);
    }
  }

  ngOnInit() {
    this.configureChartDisplay(this.currentChartGroup);
    this.config = this.configureConfig(this.config) as any;
    this.editConfig('xAxisLabel', indexOrFirst(this.keys, 0).field, false);
    this.editConfig(
      'yAxisLabel',
      indexOrFirst(this.keys, this.keys.length - 1).field,
      false
    );
    this.setSeriesGroupBy(indexOrFirst(this.keys, 0).field);
    this.plotChart();
  }
}
/**
 * returns the first index is the index is not found
 *
 * @template T
 * @param {T[]} items
 * @param {number} index
 * @returns
 */
function indexOrFirst<T>(items: T[], index: number) {
  if (items.length > 0 && index > items.length) {
    return items[0];
  }
  if (items.length > 0 && index < items.length) {
    return items[index];
  }
  return undefined;
}

// : string;
// yAxisLabel: string;
