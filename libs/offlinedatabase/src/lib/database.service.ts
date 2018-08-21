import { Injectable } from '@angular/core';
import { ModelBase } from '@dilta/common-ui/src/lib/abstraction/models.base';
import { Auth, Expense, Manager, Parent, Receipt, School, Score, Setting, Settings, Student } from '@dilta/models';
import { Database } from '@dilta/offlinedatabase/src/lib/Database';
import { EntityNames } from '@dilta/store/src/lib/entities/constants';
import { EntityService } from 'ngrx-data';

/**
 * Service priovider for user Authentication storage and operations
 *
 * @export
 * @class AuthService
 * @extends {ModelBase<Auth>}
 */
@Injectable()
export class AuthDBService extends ModelBase<Auth> {
  private entity: EntityService<Auth>;

  constructor(database: Database) {
    super(EntityNames.Auth, database.db);
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
export class ManagerDBService extends ModelBase<Manager> {
  constructor(database: Database) {
    super(EntityNames.Manager, database.db);
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
export class ParentDBService extends ModelBase<Parent> {
  constructor(database: Database) {
    super(EntityNames.Parent, database.db);
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
export class ReceiptDBService extends ModelBase<Receipt> {
  constructor(database: Database) {
    super(EntityNames.Receipt, database.db);
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
export class SchoolDBService extends ModelBase<School> {
  constructor(database: Database) {
    super(EntityNames.School, database.db);
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
export class ScoreDBService extends ModelBase<Score> {
  constructor(database: Database) {
    super(EntityNames.Score, database.db);
  }
}

/**
 * responsible for student biodata crud operations
 *
 * @export
 * @class StudentDBService
 * @extends {ModelBase<Student>}
 */
@Injectable()
export class StudentDBService extends ModelBase<Student> {
  constructor(database: Database) {
    super(EntityNames.Student, database.db);
  }
}



/**
 * responsible for users and school settings database operations
 *
 * @export
 * @class SettingDBService
 * @extends {ModelBase<Settings>}
 */
@Injectable()
export class SettingDBService extends ModelBase<Setting> {
  constructor(database: Database) {
    super(EntityNames.Setting, database.db);
  }
}

/**
 * responsible for expenses database operations
 *
 * @export
 * @class ExpenseDBService
 * @extends {ModelBase<Expense>}
 */
@Injectable()
export class ExpenseDBService extends ModelBase<Expense> {
  constructor(database: Database) {
    super(EntityNames.Expense, database.db);
  }
}
