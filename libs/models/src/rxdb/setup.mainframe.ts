import { throwError } from '@dilta/screwbox';
import { to } from 'await-to-js';
import * as RxDB from 'rxdb';
import { RxCollection, RxDatabase, RxSchema } from 'rxdb';
import { Logger } from 'winston';
import { AuthKoll, authModel } from './auth.model';
import { ManagerKoll, managerModel } from './manager.model';
import { ParentKoll, parentModel } from './parent.model';
import { ReceiptKoll, receiptModel } from './receipt.model';
import { SchoolKoll, schoolModel } from './school.model';
import { StudentKoll, studentModel } from './student.model';
import { SubjectKoll, subjectModel } from './subject.model';
import { UserKoll, userModel } from './user.model';

const { debug, warn, info, error } = new Logger({});

/** the database name for rxdb */
const DB_NAME = 'carddemodb';
/** the typeof adapter for rxdb */
const DB_ADAPTER = 'memory';

/** collection configurations to be created on the database */
export const Kollections = [
  authModel,
  managerModel,
  parentModel,
  receiptModel,
  schoolModel,
  studentModel,
  subjectModel,
  userModel
];

/**
 * interface mapping the mainframe object to its key value type info
 *
 * @interface DBKollections
 */
export interface DBKollections extends RxDatabase {
  auth: RxCollection<AuthKoll>;
  manager: RxCollection<ManagerKoll>;
  parent: RxCollection<ParentKoll>;
  receipt: RxCollection<ReceiptKoll>;
  school: RxCollection<SchoolKoll>;
  student: RxCollection<StudentKoll>;
  score: RxCollection<SubjectKoll>;
  user: RxCollection<UserKoll>;
}

/**
 * returns the intialized database connections
 *
 * @export
 * @returns {Promise< DBKollections>}
 */
export async function mainframe(plugins?: any[]): Promise<DBKollections> {
  applyPlugins(plugins);
  let db: RxDatabase, err: Error;
  [err, db] = await to<RxDatabase, Error>(
    RxDB.create({
      name: DB_NAME,
      adapter: DB_ADAPTER
    })
  );
  throwError(err);
  debug(`finshed intializing the database`);
  let _;
  [err, _] = await to(initalizeKolls(db, Kollections));
  throwError(err);
  return db as any;
}

/**
 * the configuration interface for creating collections on the database
 *
 * @export
 * @interface KolConfig
 */
export interface KolConfig<T> {
  /**
   * the name of the collection is key
   *
   * @type {string}
   * @memberof KolConfig
   */
  name: string;
  /**
   * the optional collection name in the database
   * defaulted to name if ommitted
   *
   * @type {string}
   * @memberof KolConfig
   */
  collection?: string;
  /**
   * the schema of the collection to be created
   *
   * @type {RxSchema}
   * @memberof KolConfig
   */
  schema: T;
}

/**
 * it creates new collections from the array of configurations given
 * to it.
 *
 * @param {RxDatabase} db an intialize database
 * @param {KolConfig[]} configs kollection configurations to be created on the db
 * @returns an object containing the kollections
 */
export async function initalizeKolls(
  db: RxDatabase,
  configs: KolConfig<any>[]
) {
  if (!configs.length || configs.length < 1) {
    throw configsError;
  }
  for (const config of configs) {
    const [err, dbCollection] = await to(
      db.collection({
        name: config.collection || config.name,
        schema: config.schema
      })
    );
    throwError(err);
    debug(`added ${config.name} collection to the database`);
  }
}

export function applyPlugins(plugins: any[]) {
  if (plugins) {
    plugins.forEach(RxDB.plugin);
  }
  info(`setup:::mainframe: intialize rxdb plugins`);
}

/** throws error for empty of undefined config */
export const configsError = new Error(`configs array for intializing database collections
 cannot be empty or undefined.
`);
