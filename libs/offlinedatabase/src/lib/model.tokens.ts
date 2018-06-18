import { InjectionToken } from '@angular/core';
import {
  AuthDBService,
  ManagerDBService,
  SchoolDBService,
  ScoreDBService,
  StudentDBService,
  UserDBService
} from './database.service';

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
