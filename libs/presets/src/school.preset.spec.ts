import {
  dictSchool,
  SchoolPreset,
  SchoolDict,
  dictPermision,
  Permission
} from './schools.preset';

import { sortBy } from 'lodash';

const testSchoolDict: SchoolPreset = {
  nusery: {
    levels: [
      { courses: ['math', 'english', 'qr'], name: 'kg1' },
      { courses: ['math', 'english', 'vr', 'qr'], name: 'kg2' }
    ],
    name: 'nusery',
    permision: [
      { name: 'guest', value: '0' },
      { name: 'user', value: '1' },
      { name: 'admin', value: '2' }
    ]
  },

  nusery_primary: {
    levels: [{ courses: ['eng'], name: 'nup' }],
    name: 'nusery_primary',
    permision: [{ name: 'admin', value: '8' }]
  },
  primary: {
    levels: [{ courses: ['social'], name: 'pri' }],
    name: 'primary',
    permision: [{ name: 'user', value: '3' }]
  }
};

describe('Presets Formatter::: utility functions for transformations', () => {
  it(`dictSchool::: is should map complex structure to array of
        classes, subjects and permissions only`, () => {
    const result = dictSchool('nusery', testSchoolDict);
    ['math', 'english', 'qr', 'vr'].forEach(e =>
      expect(result.subjects).toContain(e)
    );
    ['kg1', 'kg2'].forEach(e => expect(result.classes).toContain(e));
    ['guest', 'user', 'admin'].forEach(e =>
      expect(result.permisions).toContain(e)
    );
  });

  it(`dictPermision::: should map permission array to a normal key value json`, () => {
    const _tPerms: Permission[] = [
      { name: 'guest', value: '0' },
      { name: 'user', value: '1' }
    ];
    const result = dictPermision(_tPerms);
    expect(result['guest']).toEqual('0');
    expect(result['user']).toEqual('1');
  });
});
