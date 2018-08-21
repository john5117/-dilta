import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { Database } from '@dilta/offlinedatabase/src/lib/Database';
// tslint:disable-next-line:max-line-length
import { AuthDBService, ExpenseDBService, ManagerDBService, ParentDBService, ReceiptDBService, SchoolDBService, ScoreDBService, SettingDBService, StudentDBService } from '@dilta/offlinedatabase/src/lib/database.service';
// tslint:disable-next-line:max-line-length
import { AuthModel, ExpenseModel, ManagerModel, RecieptModel, SchoolModel, ScoreModel, SettingModel, StudentModel } from '@dilta/offlinedatabase/src/lib/model.tokens';

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
