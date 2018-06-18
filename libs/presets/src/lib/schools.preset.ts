import { uniq } from 'lodash';

/**
 * school Preset containing various courses and interface
 *
 * @export
 * @interface SchoolPresetBio
 */

export interface SchoolPresetBio {
  /**
   * name of the type of presets
   *
   * @type {string}
   * @memberof SchoolPresetBio
   */
  name: string;
  /**
   * level presets
   *
   * @type {Level}
   * @memberof SchoolPresetBio
   */
  levels: Level[];

  /**
   * authorization per level for the school
   *
   * @type {Permission[]}
   * @memberof SchoolPresetBio
   */
  permision: Permission[];
}

/**
 * interface for the individual level presets
 *
 * @export
 * @interface Level
 */
export interface Level {
  /**
   * name of the level
   *
   * @type {string[]}
   * @memberof Level
   */
  name: string;
  /**
   * courses over at the level
   *
   * @type {string[]}
   * @memberof Level
   */
  courses: string[];
}

/**
 * permission interface for authorization for each level
 *
 * @export
 * @interface Permission
 */
export interface Permission {
  /**
   * name of the level
   *
   * @type {string}
   * @memberof Permission
   */
  name: string;

  /**
   * value for the permision level
   *
   * @type {string}
   * @memberof Permission
   */
  value?: string | number;
}

// export enum permision {
//     Guest = 1,
//     Teacher = 2,
//     Busar = 3,
//     Manager = 4,
//     Propietor = 5,
//     Administrator = 6

// }

export const permision: Permission[] = [
  // { name: 'Guest',  value: 1 },
  { name: 'Teacher', value: 2 },
  { name: 'Busar', value: 3 },
  { name: 'Manager', value: 4 },
  { name: 'Propietor', value: 5 },
  { name: 'Administrator', value: 6 }
];

/** generic cousrses taking by the primary school */
export const _primarySyllabus = [
  'English',
  'Mathematics',
  'Civic Studies',
  'Agric Science',
  'Quantive Reasoning',
  'Verbal Reasoning',
  'c.R.S',
  'I.R.S'
];

/** primary course's mapped to the  classes */
export const _primarySchoolLevel: Level[] = [
  { name: 'Pry One', courses: _primarySyllabus },
  { name: 'Pry Two', courses: _primarySyllabus },
  { name: 'Pry Three', courses: _primarySyllabus },
  { name: 'Pry Four', courses: _primarySyllabus },
  { name: 'Pry Five', courses: _primarySyllabus },
  { name: 'Pry Six', courses: _primarySyllabus }
];

/** primary school preset */
export const primarySchool: SchoolPresetBio = {
  name: 'Primary',
  levels: _primarySchoolLevel,
  permision: permision
};

/** generic cousrses taking by the nusery school */
export const _nurserySyllabus = [];

/** nusery course's mapped to the  classes */
export const _nuserySchoolLevel: Level[] = [
  { name: 'Crech', courses: ['none'] },
  { name: 'Nusery One', courses: _nurserySyllabus },
  { name: 'Nusery Two', courses: _nurserySyllabus },
  { name: 'Nusery Three', courses: _nurserySyllabus }
];

/** nusery school presets */
export const nuserySchool: SchoolPresetBio = {
  name: 'Nusery',
  levels: _nuserySchoolLevel,
  permision: permision
};

/** nusery and primary school presets */
export const nuseryPrimarySchool: SchoolPresetBio = {
  name: 'Nusery && Primary',
  levels: [..._nuserySchoolLevel, ..._primarySchoolLevel],
  permision: permision
};

/**
 * interface documentation for all
 * presets available
 *
 * @export
 * @interface SchoolPreset
 */
export interface SchoolPreset {
  /**
   * preset for nsuery school only
   *
   * @type {typeof nuserySchool}
   * @memberof SchoolPreset
   */
  nusery: typeof nuserySchool;
  /**
   * presets for primary school only
   *
   * @type {typeof primarySchool}
   * @memberof SchoolPreset
   */
  primary: typeof primarySchool;
  /**
   * preset for both prmary and nusery school
   *
   * @type {typeof nuseryPrimarySchool}
   * @memberof SchoolPreset
   */
  nusery_primary: typeof nuseryPrimarySchool;
}

/** full export of all the presets */
export const schoolPresetBios: SchoolPreset = {
  nusery: nuserySchool,
  primary: primarySchool,
  nusery_primary: nuseryPrimarySchool
};

/**
 * school dictonary interface after transformations
 *
 * @export
 * @interface SchoolDict
 */
export interface SchoolDict {
  /**
   * array of school classes
   *
   * @type {string[]}
   * @memberof SchoolDict
   */
  classes: string[];
  /**
   * array of subjects offered by schools
   *
   * @type {string[]}
   * @memberof SchoolDict
   */
  subjects: string[];
  /**
   * an object contaning various permissions for the object
   *
   * @type {Object}
   * @memberof SchoolDict
   */
  permisions: Object;
}

/**
 * cheans the school presets information to a nice
 * json dictionary
 *
 * @export
 * @param {keyof SchoolPreset} preset
 * @returns {SchoolDict}
 */
export function dictSchool(
  preset: keyof SchoolPreset,
  customDict?: typeof schoolPresetBios
): SchoolDict {
  const _schoolPresetBios = customDict || schoolPresetBios;
  // tslint:disable-next-line:no-shadowed-variable
  const { levels, name, permision } = _schoolPresetBios[preset];
  const schoolClasses: string[] = levels.map(level => level.name);
  const schoolSubjects = uniq(
    levels.map(level => level.courses).reduce((p, c) => {
      return [...p, ...c];
    }, [])
  );
  return {
    classes: schoolClasses,
    subjects: schoolSubjects,
    permisions: dictPermision(permision)
  };
}

/**
 * converts the array of perimsions to
 * a nice json dictionary
 *
 * @export
 * @param {Permission[]} [permsions=[]]
 * @returns
 */
export function dictPermision(permsions: Permission[] = []) {
  const _dict = {};
  permsions.forEach(p => (_dict[p.name] = p.value));
  return _dict;
}
