import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/observable';

import { Database } from './Database';
import {
  AuthDBService,
  ManagerDBService,
  SchoolDBService,
  ScoreDBService,
  StudentDBService,
  UserDBService,
  ReceiptDBService,
  ParentDBService
} from './database.service';
import {
  AuthModel,
  StudentModel,
  ManagerModel,
  SchoolModel,
  ScoreModel,
  UserModel
} from './model.tokens';

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
  UserDBService
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
