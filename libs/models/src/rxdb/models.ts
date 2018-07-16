import { SchoolPreset } from '@dilta/presets';
import { RxCollection } from 'rxdb';

/**
 * school managers biodata's record stored in the database's interface
 *
 * @export
 * @interface Manager
 */
export interface Manager {
  id?: string;
  propName: string;
  propPhone: string;
  propEmail: string;
  sMName: string;
  sMPhone: string;
  sMEmail: string;
  motto: string;
  school: string;
}


/**
 * student biodata's record stored in the database's interface
 *
 * @export
 * @interface Parent
 */
export interface Parent {
  phoneNo: number;
  name: string;
  relationship: string;
  homeAddress: string;
  workAddress?: string;
  email?: string;
  profession: string;
  workcategory: string;
  town: string;
  state: string;
  school: string;
}


/**
 * student payments record stored in the database's interface
 *
 * @export
 * @interface Receipt
 */
export interface Receipt {
  name: string;
  date: string | Date;
  amount: number;
  teacherId: string;
  teacherName: string;
  studentId: string;
  universalId: string;
  session: string;
  term: string;
  class: string;
  createdAt: Date;
  updatedAt: Date;
  school: string;
}


/**
 * School biodata record stored in the database's interface
 *
 * @export
 * @interface School
 */
export interface School {
  id?: string;
  logo?: string;
  name: string;
  email: string;
  description: string;
  category: keyof SchoolPreset;
  address: string;
  town: string;
  state: string;
}


/**
 * student biodata information recored stored in the database's interface
 *
 * @export
 * @interface Student
 */
export interface Student {
  id: string;
  name: string;
  class: string;
  gender: string;
  dob: string;
  bloodgroup?: string;
  prevschool?: string;
  parentPhone: number;
  school: string;
}


/**
 * subject records information recored stored in the database's interface
 *
 * @export
 * @interface Score
 */
export interface Score {
  subject: string;
  teacherId: string;
  class: string;
  session: string;
  term: string;
  firstCa: number;
  secondCa: number;
  exam: number;
  studentId: string;
  school: string;
}


/**
 * teachers biodata information recored stored in the database's interface
 *
 * @export
 * @interface User
 */
export interface User {
  id?: string;
  name: string;
  gender: string;
  phoneNo: string | number;
  class: string;
  subject: string;
  phoneNos: string;
  address: string;
  image: File | string;
  email?: string;
  level: string;
  authId: string;
  school: string;
}


/**
 * program users authorization record stored in the database's interface
 *
 * @export
 * @interface Auth
 */
export interface Auth {
  username: string;
  password: string;
  level: string;
  school: string;
  id?: string;
}


/**
 * Interface for Busary Expenses in general
 *
 * @export
 * @interface Expense
 */
export interface Expense {
  name: string;
  date: string;
  amount: number;
  receiverId?: string;
  busarId?: string;
  purpose?: string;
  category: string;
  universalId: string;
  session: string;
  term: string;
  createdAt: string;
  updatedAt?: string;
  capital: boolean;
  school: string;
}

/**
 * type settings to be stored for user an of type
 */
export type Settings = { [p in keyof any]: SettingPreference } | { _id: string };

export interface Setting {
  id: string;
  owner: string;
  type: string;
  settings: Settings;
  school: string;
}

/**
 * Interface of the SettingState
 *
 * @export
 * @interface SettingPreference
 */
export interface SettingPreference {
  /**
   * that url is clickable
   *
   * @type {boolean}
   * @memberof SettingPreference
   */
  enabled?: boolean;
  /**
   * nested Submenus
   *
   * @type {Settings}
   * @memberof SettingPreference
   */
  submenus?: Settings;
  /**
   * Url Link to route to
   *
   * @type {string}
   * @memberof SettingPreference
   */
  link?: string;
  /**
   * name of the current menu
   *
   * @type {string}
   * @memberof SettingPreference
   */
  name: string;

  /**
   * Inputs to be added to child view
   *
   * @type {{
   *     addClasses: boolean
   *     values: { [k in keyof any ]: string }[];
   *   }}
   * @memberof SettingPreference
   */
  inputs?: { [k in keyof any]: string }[];
}


/**
 * export interface for the rxcollection provided
 * in the database created
 *
 * @export
 * @interface OfflineDB
 */
export interface OfflineDB {
  manager: RxCollection<Manager>;
  parent: RxCollection<Parent>;
  receipt: RxCollection<Receipt>;
  school: RxCollection<School>;
  student: RxCollection<Student>;
  score: RxCollection<Score>;
  user: RxCollection<User>;
  auth: RxCollection<Auth>;
  setting: RxCollection<Settings>;
  expense: RxCollection<Expense>;
}
