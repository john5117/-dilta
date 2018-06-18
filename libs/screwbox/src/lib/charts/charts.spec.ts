/* tslint:disable:no-unused-variable */

import {
  ChartMap,
  series,
  Series,
  single,
  SeriesMap,
  quaitave,
  chartMapConfigError,
  defaultSingleValue,
  seriesConfigError
} from './charts';
import { examList } from './../gen.faker';

const data = examList(20);

const map: { name: string; class: string; subject: string }[] = [
  {
    name: 'jin li',
    class: 'pry 1',
    subject: 'maths'
  },
  {
    name: 'jon doe',
    class: 'pry 3',
    subject: 'english'
  },
  {
    name: 'tyuw doe',
    class: 'pry 3',
    subject: 'social'
  },
  {
    name: 'jon doe',
    class: 'pry 3',
    subject: 'maths'
  },
  {
    name: 'jon doe',
    class: 'pry 1',
    subject: 'english'
  }
];

describe(`Chart: single()`, () => {
  it(`single(): should return an array of single dataFormat`, () => {
    const mapped = single(data, { name: 'name', value: 'exam' });
    if (mapped.length <= 0) {
      // passing in valid array to test
      return fail();
    }
    expect(Object.keys(mapped[0]).length).toBe(2);
    // check if name value keys are there
    expect(Object.keys(mapped[0]).indexOf('name')).toBeGreaterThan(-1);
    expect(Object.keys(mapped[0]).indexOf('value')).toBeGreaterThan(-1);
  });
  it(`single(): should map array of single over custom function`, () => {
    const mapped = single(map, {
      name: 'name',
      value: 'class',
      map: e => e.class
    });
    if (mapped.length <= 0) {
      // passing in valid array to test
      return fail();
    }
    expect(mapped[0].value).toBe(map[0].class);
  });

  it(`should throw error is config is missing or unprovided`, () => {
    const testValues = [undefined, 's', 1, true];
    testValues.forEach(e => {
      expect(() => single(data, e as any)).toThrowError(
        chartMapConfigError.message
      );
    });
  });
});

describe(`charts: series()`, () => {
  it(`series(): should return a series data format`, () => {
    const mapped = series(data, {
      name: 'name',
      series: { name: 'class', value: 'exam' }
    });
    if (mapped.length <= 0) {
      // passing in valid array to test
      return fail();
    }
    expect(Object.keys(mapped[0]).length).toBe(2);
    // check if name value keys are there
    expect(Object.keys(mapped[0]).indexOf('name')).toBeGreaterThan(-1);
    expect(Object.keys(mapped[0]).indexOf('series')).toBeGreaterThan(-1);
  });
  it(`should throw error is config is missing or unprovided`, () => {
    const testValues = [undefined, 's', 1, true];
    testValues.forEach(e => {
      expect(() => series(data, e as any)).toThrowError(
        seriesConfigError.message
      );
    });
  });
});

describe('Utils: Chart', () => {
  it(`quaitave(): should return qualitavte numeric for non-numeric values`, () => {
    // calculate the amount of subjects done a class
    // it just groupby unique values and number them => groups them by class and finds the subject
    // note it almost splits out the same data has single()
    const _qual = quaitave(map, 'class', 'subject');
    expect(_qual[0].value).toEqual(2);
    // returns the name has each class and amount of subject has value
  });
});
