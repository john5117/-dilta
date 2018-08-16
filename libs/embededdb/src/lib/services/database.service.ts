import { electronDatabase } from '@dilta/electron';
import { Auth, DBKollections, Expense, Manager, Parent, Receipt, School, Score, Setting, Student, User } from '@dilta/models';
import { protectAuthDetails, throwError } from '@dilta/screwbox';
import { EntityNames } from '@dilta/store/src/lib/entities/constants';
import { Inject, Injectable } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { ModelBase } from './models.base';
/** Token For RXDB leveldown instance */
export const EmbededDatabaseToken = 'RXDB_LOCAL';

// @Inject(EmbededDatabaseToken) public database: DBKollections

/**
 * Service priovider for user Authentication storage and operations
 *
 * @export
 * @class AuthService
 * @extends {ModelBase<Auth>}
 */
@Injectable()
export class AuthService extends ModelBase<Auth> {

  /** sanitilize auth details */
  public santizeAuth = protectAuthDetails;

  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.Auth, database);
  }

}

/**
 * ManagerService for users offline storage
 *
 * @export
 * @class ManagerService
 * @extends {ModelBase<Manager>}
 */
@Injectable()
export class ManagerService extends ModelBase<Manager> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.Manager, database);
  }
}

/**
 * Class responsble for parent offline storage operations
 *
 * @export
 * @class ParentService
 * @extends {ModelBase<Parent>}
 */
@Injectable()
export class ParentService extends ModelBase<Parent> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.Parent, database);
  }
}

/**
 * responsible for the database operations of receipts
 *
 * @export
 * @class ReceiptService
 * @extends {ModelBase<Receipt>}
 */
@Injectable()
export class ReceiptService extends ModelBase<Receipt> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.Receipt, database);
  }
}

/**
 * responsible for school database operations
 *
 * @export
 * @class SchoolService
 * @extends {ModelBase<School>}
 */
@Injectable()
export class SchoolService extends ModelBase<School> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.School, database);
  }
}

/**
 * responsible for student score database operations
 *
 * @export
 * @class ScoreService
 * @extends {ModelBase<Score>}
 */
@Injectable()
export class ScoreService extends ModelBase<Score> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.Score, database);
  }
}

/**
 * responsible for student biodata crud operations
 *
 * @export
 * @class StudentService
 * @extends {ModelBase<Student>}
 */
@Injectable()
export class StudentService extends ModelBase<Student> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.Student, database);
  }
}

/**
 * responsible for the users [ teachers ] database operations
 *
 * @export
 * @class UserService
 * @extends {ModelBase<User>}
 */
@Injectable()
export class UserService extends ModelBase<User> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.User, database);
  }
}

/**
 * responsible for users and school settings database operations
 *
 * @export
 * @class SettingService
 * @extends {ModelBase<Settings>}
 */
@Injectable()
export class SettingService extends ModelBase<Setting> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.Setting, database);
  }
}

/**
 * responsible for expenses database operations
 *
 * @export
 * @class ExpenseService
 * @extends {ModelBase<Expense>}
 */
@Injectable()
export class ExpenseService extends ModelBase<Expense> {
  constructor(@Inject(EmbededDatabaseToken) public database: DBKollections) {
    super(EntityNames.Expense, database);
  }
}

/** Provider Token Mapping  */
const embededDBProvider: FactoryProvider = {
  provide: EmbededDatabaseToken,
  useFactory: async () => {
    const [err, db] = await electronDatabase();
    throwError(err);
    return db;
  }
};

export const rxServices = [
  embededDBProvider,
  AuthService,
  ManagerService,
  ParentService,
  ReceiptService,
  SchoolService,
  ScoreService,
  StudentService,
  UserService,
  SettingService,
  ExpenseService
];
