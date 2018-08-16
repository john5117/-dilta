import { InjectionToken } from '@angular/core';
// tslint:disable-next-line:max-line-length
import {
  AuthDBService,
  ExpenseDBService,
  ManagerDBService,
  ReceiptDBService,
  SchoolDBService,
  ScoreDBService,
  SettingDBService,
  StudentDBService,
  UserDBService
} from '@dilta/offlinedatabase/src/lib/database.service';

export const AuthModel = new InjectionToken<AuthDBService>('AuthModel');
export const ManagerModel = new InjectionToken<ManagerDBService>(
  'ManagerModel'
);
export const SchoolModel = new InjectionToken<SchoolDBService>('SchoolModel');
export const ScoreModel = new InjectionToken<ScoreDBService>('ScoreModel');
export const StudentModel = new InjectionToken<StudentDBService>(
  'StudentModel'
);
export const UserModel = new InjectionToken<UserDBService>('UserModel');
export const SettingModel = new InjectionToken<SettingDBService>(
  'SettingModel'
);
export const ExpenseModel = new InjectionToken<ExpenseDBService>(
  'ExpenseModel'
);
export const RecieptModel = new InjectionToken<ReceiptDBService>(
  'RecieptModel'
);
