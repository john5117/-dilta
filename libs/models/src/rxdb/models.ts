import { ManagerKoll } from './manager.model';
import { ParentKoll } from './parent.model';
import { ReceiptKoll } from './receipt.model';
import { SchoolKoll } from './school.model';
import { StudentKoll } from './student.model';
import { SubjectKoll } from './subject.model';
import { UserKoll } from './user.model';
import { AuthKoll } from './auth.model';
import { RxCollection } from 'rxdb';

/**
 * exporting model interfaces has barrel export
 */
export type Manager = ManagerKoll;
export type Parent = ParentKoll;
export type Receipt = ReceiptKoll;
export type School = SchoolKoll;
export type Student = StudentKoll;
export type Score = SubjectKoll;
export type User = UserKoll;
export type Auth = AuthKoll;

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
}
