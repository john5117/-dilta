import { electronDatabase } from '@dilta/electron';
import { DBKollections, Parent, Receipt, Student, User } from '@dilta/models';
import { throwError } from '@dilta/screwbox';
import to from 'await-to-js';
import { RxCollection } from 'rxdb';
import * as gen from './school.data';

async function generate() {
  let db: DBKollections;
  let err: Error;
  let _;
  const data = script();
  [_, [err, db]] = await to(electronDatabase());
  throwError(err);
  [err, _] = await to(uploadData(db.school, data.school, 'school'));
  throwError(err);
  [err, _] = await to(uploadData(db.manager, data.manager, 'manager'));
  throwError(err);
  [err, _] = await to(uploadData(db.user, data.teachers, 'teachers'));
  throwError(err);
  [err, _] = await to(uploadData(db.parent, data.parents, 'parents'));
  throwError(err);
  [err, _] = await to(uploadData(db.student, data.students, 'students'));
  throwError(err);
}

function exit() {
  console.log('finished');
  process.exit(0);
}

generate()
  // .then(() => exit())
  .catch(console.error);

async function uploadData<T>(
  kol: RxCollection<T>,
  data: T[] | T,
  name = 'default'
) {
  try {
    if ((data as T[]).length) {
      const localArray: T[] = data as any;
      localArray.forEach(d => saver(kol, d, name));
      return;
    }
    const local: T = data as any;
    saver(kol, local, name);
  } catch (e) {
    throw e;
  }
}

async function saver<T>(koll: RxCollection<T>, data: T, name = 'defalt') {
  const [err, savedData] = await to(koll.upsert(data));
  console.log(name, data['id'], err);
  throwError(err);
  return savedData;
}

function script() {
  const school = gen.school();
  const manager = gen.manager();
  manager.school = school.id;
  const parents: Parent[] = [];
  const receipts: Receipt[] = [];
  const teachers = gen.list<User>(gen.admin, 30)
  .map((t) => Object.assign({}, t, { school: school.id }));
  const students = gen.list<Student>(gen.student, 800).map(stud => {
    const parent = gen.parent();
    const studentReceipt = gen.list<Receipt>(gen.receipt, 8).map(receipt => {
      const busary = gen.select(teachers);
      receipt.name = stud.name;
      receipt.school = school.id;
      receipt.teacherId = busary.id;
      receipt.studentId = stud.id;
      return receipt;
    });
    receipts.concat(studentReceipt);
    parent.school = school.id;
    stud.school = school.id;
    stud.parentPhone = parent.phoneNo;
    parents.push(parent);
    return stud;
  });
  return { school, manager, parents, receipts, teachers, students };
}
