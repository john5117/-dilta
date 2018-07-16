import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { Database } from './Database';
// tslint:disable-next-line:max-line-length
import { AuthDBService, ExpenseDBService, ManagerDBService, ParentDBService, ReceiptDBService, SchoolDBService, ScoreDBService, SettingDBService, StudentDBService, UserDBService } from './database.service';
// tslint:disable-next-line:max-line-length
import { AuthModel, ExpenseModel, ManagerModel, RecieptModel, SchoolModel, ScoreModel, SettingModel, StudentModel, UserModel } from './model.tokens';

const injectMappings = [
  {
    provide: AuthModel,
    useExisting: forwardRef(() => AuthDBService)
  },
  {
    provide: StudentModel,
    useExisting: forwardRef(() => StudentDBService)
  },
  {
    provide: ManagerModel,
    useClass: ManagerDBService
  },
  {
    provide: SchoolModel,
    useExisting: forwardRef(() => SchoolDBService)
    // useClass: SchoolDBService
  },
  {
    provide: ScoreModel,
    useExisting: forwardRef(() => ScoreDBService)
  },
  {
    provide: UserModel,
    useExisting: forwardRef(() => UserDBService)
  },
  {
    provide: SettingModel,
    useExisting: forwardRef(() => SettingDBService)
  },
  {
    provide: ExpenseModel,
    useExisting: forwardRef(() => ExpenseDBService)
  },
  {
    provide: RecieptModel,
    useExisting: forwardRef(() => ReceiptDBService)
  }
];

const providers = [
  Database,
  AuthDBService,
  ManagerDBService,
  ParentDBService,
  ReceiptDBService,
  SchoolDBService,
  ScoreDBService,
  StudentDBService,
  UserDBService,
  SettingDBService,
  ExpenseDBService
];

/**
 * Offline database of database models based on rxjs
 *
 * @export
 * @class OfflinedatabaseModule
 */
@NgModule({
  imports: [CommonModule],
  providers: [...providers, ...injectMappings]
})
export class OfflinedatabaseModule {}
