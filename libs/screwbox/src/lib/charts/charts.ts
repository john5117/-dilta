import { groupBy, keys, isArray } from 'lodash';
import { errorInvalidArray } from './../sub.compose';

/**
 * configuration interface for single data
 *
 * @example { name: 'name', value: 'exam' }
 * @export
 * @interface ChartMap
 */

export interface ChartMap<T> {
  name: string;
  value: keyof T;
  /**
   * manipulates value due to users specific result
   *
   * @param {T} value current object to apply map on
   * @returns {(string | number)} return value for mapped action
   * @memberof ChartMap
   */
  map?(value: T): string | number;
}

/**
 * single data  item format interface
 *
 * @export
 * @interface Single
 */
export interface Single {
  name: string;
  value: number | string;
}

export const chartMapConfigError = new Error(
  `missing or invalid chartMapConfig passed`
);

/**
 * Takes an array and returns a valid single data formated array
 *
 * @example [{name: 'king', value: 100 }, {name: 'love', value: 50 }]
 * @export single<T>
 * @template T data item format
 * @param {Array<T>} data an array of data to be converted
 * @param {ChartMap} config configuration of key value names to return
 * @returns {Single[]} single mapped data
 */
export function single<T>(data: Array<T>, config: ChartMap<any>): Single[] {
  if (typeof config !== 'object') {
    throw chartMapConfigError;
  }
  errorInvalidArray(data);
  return data.map(e =>
    Object.assign(
      {},
      {
        name: e[config.name],
        value: defaultSingleValue(e, config)
      }
    )
  );
}

/**
 * defaults the single value to be returned
 *
 * @export
 * @template T object type
 * @param {T} e object passed which value is gotten from
 * @param {ChartMap<T>} config custom configuration
 * @returns value defaulted
 */
export function defaultSingleValue<T>(e: T, config: ChartMap<T>) {
  if (typeof config !== 'object') {
    throw chartMapConfigError;
  }
  let value: string | number = e[config.value] as any;
  if (typeof config.map === 'function') {
    return (value = config.map(e));
  }
  return typeof value === 'number' ? value : 0;
}

/**
 * expected configuration for series data format interface
 * note that the toplevel name bears to grouping attribute
 * while the second is series plot passed to the single series
 *
 * @example {name: 'name', series: { name: 'class', value: 'exam' }
 * @interface SeriesMap
 */
export interface SeriesMap<T> {
  name: string;
  dataStyle?: boolean; // return the corresponding data structure instead of single
  series: ChartMap<T>;
}
/**
 * mapped series data item format interface
 *
 * @export
 * @interface Series
 */
export interface Series {
  name: string;
  series: any[];
}

/**
 * @constant seriesConfigError error throw when series configuration is missing
 */
export const seriesConfigError = new Error(`series configuration is required`);

/**
 * Takes an array and returns a valid series data formated array
 *
 * @example [ { name: 'john stone', series: { name: 'class', value: 60  } },
 * { name: 'rebz rilzi', series: { name: 'class', value: 90  } } ]
 * @export series
 * @template T data item format
 * @param {Array<T>} data an array of data to be converted
 * @param {SeriesMap} config configuration of key value names to return
 * @returns {Series[]} single mapped data
 */
export function series<T>(data: Array<T>, config: SeriesMap<T>) {
  if (typeof config !== 'object') {
    throw seriesConfigError;
  }
  // checking if it is a valid array
  errorInvalidArray(data);
  // sorting and grouping each by the name key
  const _formated = groupBy(data, config.name);
  return keys(_formated).map(e => {
    return {
      name: e,
      series: config.dataStyle
        ? _formated[e]
        : single(_formated[e], config.series)
    };
  });
}

/**
 * operates on a non value array and returns a numeric value statement
 *
 * @export
 * @template T Item Type passed
 * @param {Array<T>} data array of objects to quaitave
 * @param {keyof T} value key of object to groupby
 * @param {keyof T} name finds the names for the key
 * @returns quaitaved array
 * using qualitavte with a series array can be done like this
 * @example series(map, { name: 'subject', series: { name: 'name', value: 'class',
 *   map: (e) => e.class } } })
 *  .map(e => { return { name: e.name, series: quaitave(e.series, 'name', 'value') }})
 * note name and value passed to thq quaitaive because of the result mapping
 * from the series operation
 */
export function quaitave<T>(
  data: Array<T>,
  name: any,
  value: any,
  isSingle?: boolean
) {
  // if (typeof data[value] === 'number')
  const _data = groupBy(data, value);
  return Object.keys(_data).map((e, i) => {
    const _obj = _data[e];
    const _array = _obj.map(obj => {
      return {
        name: obj[name],
        value: obj[value]
      };
    });
    return {
      name,
      value: isSingle
        ? _array[0]['value'] ? _array[0]['value'] : []
        : _data[e].length,
      atrb: name
    };
  });
}

/**
 * takes an array mapped to series and quaivated
 *
 * @export
 * @template T
 * @param {T[]} data
 * @param {SeriesMap<T>} config
 * @returns
 */
export function seriesQuaitave<T>(data: T[], config: SeriesMap<T>) {
  const { name, value } = config.series;
  return series(data, config).map(e => {
    return {
      name: e.name,
      series: quaitave(e.series as any, name as any, value, true)
    };
  });
}
