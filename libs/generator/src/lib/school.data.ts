import { BusarExpenseSummary, BusarRevenueSummary } from '@dilta/busar';
import * as faker from 'faker';
import { pick } from 'shuffle-array';

/**
 * creates an array with amount-count elements from
 * the function result passed
 *
 * @export
 * @template T
 * @param {Function} method
 * @param {number} [amount=5]
 * @returns {T[]}
 */
export function list<T>(method: Function, amount: number = 5): T[] {
  const _list = [];
  for (let i = 0; i < amount; i++) {
    _list.push(method());
  }
  return _list;
}

/**
 * returns an item from the array
 *
 * @export
 * @template T
 * @param {Array<T>} array
 * @returns {(T | T[])}
 */
export function select<T>(array: Array<T>): T | T[] {
  return pick(array);
}

export interface School {
  name: string;
  email: string;
  description: string;
  category: any;
  address: string;
  town: string;
  state: string;
}

export function school(): School {
  return {
    address: faker.address.streetAddress(),
    category: select(['primary', 'secondary']),
    description: faker.random.words(45),
    email: faker.internet.email(),
    name: faker.company.companyName(),
    state: faker.address.state(),
    town: faker.address.city()
  };
}

export const schoolList = (amount?: number) => list<School>(school, amount);

export interface Manager {
  propName: string;
  propPhone: string;
  propEmail: string;
  sMName: string;
  sMPhone: string;
  sMEmail: string;
  motto: string;
}

export function manager(): Manager {
  return {
    motto: faker.lorem.lines(1),
    propEmail: faker.internet.email(),
    propName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    propPhone: faker.phone.phoneNumber(),
    sMEmail: faker.internet.email(),
    sMName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    sMPhone: faker.phone.phoneNumber()
  };
}

export const managerList = (amount?: number) => list<Manager>(manager, amount);

export interface Student {
  name: string;
  age: number;
  class: any;
  gender: any;
  parentPhone: string;
  bloodgroup?: any;
  prevschool: string;
  id?: string;
}

export const classes = [
  'pry1',
  'pry2',
  'pry3',
  'pry4',
  'pry5',
  'pry6',
  'nus1',
  'nus2',
  'nus3'
];
export const genders = ['Male', 'Female'];
export const bloodgroups = ['A', 'B', 'AB', 'O'];

export function student(): Student {
  return {
    age: faker.random.number({ min: 2, max: 10 }),
    class: select(classes),
    bloodgroup: select(bloodgroups),
    gender: select(genders),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    parentPhone: faker.phone.phoneNumber(),
    prevschool: faker.company.companyName(),
    id: faker.random.uuid()
  };
}

export const studentList = (amount?: number) => list<Student>(student, amount);

export interface Parent {
  phoneNo: string;
  name: string;
  relationship: any;
  homeAddress: string;
  workAddress?: string;
  email?: string;
  profession: string;
  workcategory: string;
  town: string;
  state: string;
}

export const relationships = ['Guardian', 'Parent'];

export function parent(): Parent {
  return {
    email: faker.internet.email(),
    homeAddress: faker.address.streetAddress(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    phoneNo: faker.phone.phoneNumber(),
    profession: faker.name.jobDescriptor(),
    relationship: select(relationships),
    state: faker.address.state(),
    town: faker.address.city(),
    workAddress: faker.address.secondaryAddress(),
    workcategory: faker.name.jobType()
  };
}

export const parentList = (amount?: number) => list<Parent>(parent, amount);

export interface Receipt {
  name: string;
  date: string | Date;
  amount: number;
  teacherId: string;
  teacherName: string;
  studentId: string;
  universalId: string;
  session: any;
  term: any;
  class: any;
  createdAt: any;
  updatedAt: any;
}

export const terms = ['first term', 'second term', 'third term'];
export const sessions = ['2016/2017', '2018/2019', '2015/2016'];

export function receipt(): Receipt {
  return {
    name: faker.name.findName(),
    amount: faker.random.number({ max: 10000, min: 2000 }),
    class: select(classes),
    createdAt: Date.now(),
    date: Date(),
    session: select(sessions),
    studentId: faker.random.alphaNumeric(8),
    teacherId: faker.random.uuid(),
    teacherName: faker.name.findName(),
    term: select(terms),
    universalId: faker.random.uuid(),
    updatedAt: Date()
  };
}

export const receiptList = (amount = 5) => list<Receipt>(receipt, amount);

export interface Admin {
  name: string;
  gender: string;
  phoneNo: string | number;
  classInCh: string;
  subjectICh: string;
  phoneNos: string;
  address: string;
  image: File | string;
  email?: string;
  level: string;
}

export const subjects = [
  'english',
  'chemistry',
  'biology',
  'mathematics',
  'physics',
  'economics',
  'geography',
  'government',
  'literature'
];
export const levels = ['owner', 'manager', 'busar', 'teacher'];

export function admin(): Admin {
  return {
    address: faker.address.streetAddress(),
    classInCh: select(classes) as any,
    subjectICh: select(subjects) as any,
    email: faker.internet.email(),
    gender: faker.helpers.randomize(genders)[0],
    image: faker.image.dataUri(100, 200),
    name: faker.name.findName(),
    phoneNo: faker.phone.phoneNumber(),
    phoneNos: faker.phone.phoneNumber(),
    level: select(levels) as any
  };
}

export const adminsList = (amount = 5) => list<Admin>(admin, amount);

export interface Score {
  name: string;
  fa: number;
  sa: number;
  exam: number;
  id: string;
  session: string;
  b_id: string;
  subject: string;
  class: string;
  term: string;
}

export function scoreGen(): Score {
  return {
    class: select(classes) as any,
    subject: select(subjects) as any,
    b_id: faker.random.uuid(),
    name: faker.name.findName(),
    fa: faker.random.number({ min: 0, max: 15 }),
    sa: faker.random.number({ min: 0, max: 15 }),
    exam: faker.random.number({ min: 0, max: 70 }),
    id: faker.random.uuid(),
    session: select(sessions) as any,
    term: select(terms) as any
  };
}

export const examList = (no = 5) => list<Score>(scoreGen, no);
// accounts doesnt use erasers...methodlogy
interface SchoolMetaData {
  personal_ID: string;
  school_ID: string;
}

export function teacher() {
  return {
    universalId: faker.random.uuid(),
    name: faker.name.findName()
  };
}

// export const managerList = (amount?: number) => list(manager, amount);

export function busarRevenueSummary() {
  return <BusarRevenueSummary>{
    currentMonthHighestCategory: faker.commerce.product(),
    currentMonthHighestCategoryRevenue: faker.random.number(500000),
    currentMonthHighestClass: select(classes) as any,
    currentMonthLowestClass: select(classes) as any,
    currentMonthHighestRevenue: faker.random.number(2000000),
    currentMonthLowestRevenue: faker.random.number(20000),
    currentMonthPercentage: faker.random.number(90),
    currentMonthRevenue: faker.random.number(20000),
    expectedTermSchoolFees: faker.random.number(20000000),
    highestMonthPercentage: faker.random.number(70),
    previousMonthRevenue: faker.random.number(20000),
    totalTermSchoolFees: faker.random.number(20000000),
  };
}

export function busarExpenseSummary() {
  return <BusarExpenseSummary>{
    currentMonth: faker.random.number(500000),
    currentMonthCapital: faker.random.number(300000),
    currentMonthHighestCategory: faker.commerce.product(),
    currentMonthHighestCategoryExpense: faker.random.number(300000),
    currentMonthLowestCategory: faker.commerce.product(),
    currentMonthLowestCategoryExpense: faker.random.number(90000),
    currentMonthRecurrent: faker.random.number(60000),
    preivousMonth: faker.random.number(30000),
    totalTerm: faker.random.number(20000000)
  };
}
