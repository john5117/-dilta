import {
  confirmRequiredKeys,
  defaultKeys,
  errorInvalid,
  errorInvalidArray,
  ArrayError,
  errorNotAndObject,
  fileBase64,
  getProp
} from './sub.compose';

describe(`SubCompose: defaultkeys()`, () => {
  const keys = ['name', 'class'];
  const defaultVal = 'default';

  it(`should default all the object keys to null`, () => {
    const value = defaultKeys({}, keys);
    Object.keys(value).forEach(e => expect(value[e]).toEqual(null));
  });

  it(`should default all the object keys to passed value`, () => {
    const value = defaultKeys({}, keys, defaultVal);
    Object.keys(value).forEach(e => expect(value[e]).toEqual(defaultVal));
  });

  it(`should default part of the object keys`, () => {
    let value = defaultKeys({ name: defaultVal }, keys);
    expect(value['name']).toBe(defaultVal);
    expect(value['class']).toBe(null);

    value = defaultKeys({ name: defaultVal }, keys, defaultVal);
    expect(value['name']).toBe(defaultVal);
    expect(value['class']).toBe(defaultVal);
  });
});

describe(`SubCompose: confirmRequiredKeys()`, () => {
  const keys = ['name', 'class'];

  it(`should not throw error when ruqirements keys are met`, () => {
    expect(() => {
      confirmRequiredKeys({ name: 'john', class: 'none' }, keys, 'test');
    }).not.toThrowError();
  });

  it(`should throw error when ruqirements keys are unmet`, () => {
    expect(() => {
      confirmRequiredKeys({ name: 'john' }, keys, 'test');
    }).toThrowError(`this ${'class'} is required for ${'test'} `);
  });
});

describe(`SubCompose: errorInvalid()`, () => {
  const keys = ['name', 'class'];
  const error = new Error(`error invalid testing`);

  it(`should not throw error if value either true or an object`, () => {
    const testValues = [{}, true, 'string', 'number', 5];
    testValues.forEach(e =>
      expect(() => errorInvalid(e, error)).not.toThrowError()
    );
  });

  it(`shouldthrow error if value is neither true nor an object`, () => {
    const testValues = [undefined, null];
    testValues.forEach(e =>
      expect(() => errorInvalid(e as any, error)).toThrowError(error.message)
    );
  });
});

describe(`SubCompose: errorNotAndObject()`, () => {
  const keys = ['name', 'class'];
  const error = new Error(`errorNotAndObject testing`);

  it(`should not throw error if value either true or an object`, () => {
    expect(() => errorNotAndObject({}, error)).not.toThrowError();
  });

  it(`shouldthrow error if value is not an object`, () => {
    const testValues = [undefined, null, true, false, 'king', 7];
    expect(() =>
      testValues.forEach(e => errorNotAndObject(undefined as any, error))
    ).toThrowError(error.message);
  });
});

describe(`SubCompose: getProp()`, () => {
  const data = { name: 'name_value' };

  it(`should return the actual property if it exists`, () => {
    expect(getProp(data, 'name')).toBe(data['name']);
  });

  it(`should return null if the property is not defaulted and missing`, () => {
    expect(getProp(data, 'any')).toBe(null);
  });

  it(`should return defaulted property if missing`, () => {
    const defValue = 'dfeal';
    expect(getProp(data, 'any', defValue)).toBe(defValue);
  });
});

describe(`SubCompose: errorInvalidArray()`, () => {
  it(`should no throw error if value is a valid array`, () => {
    const testValues = [[], ['name', 'tyt'], [1, 2], [true, false]];
    expect(() =>
      testValues.forEach(e => errorInvalidArray(e as any[]))
    ).not.toThrowError(ArrayError.message);
  });
  it(`should throw error if value is not a valid array`, () => {
    const testValues = [undefined, null, true, false, 'king', 7, {}];
    expect(() =>
      testValues.forEach(e => errorInvalidArray(e as any))
    ).toThrowError(ArrayError.message);
  });
});
