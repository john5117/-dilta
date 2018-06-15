import {
  RxDatabase,
  RxDocument,
  RxSchema,
  RxCollectionCreator,
  RxCollection
} from 'rxdb';
import * as RxDB from 'rxdb';
import { orderBy } from 'lodash';
import { Card } from './utils';
import { Observable } from 'rxjs/Observable';
import { isArray } from 'util';

RxDB.plugin(require('pouchdb-adapter-memory'));

// export const requiredKeys = ['name', 'subject',
//     'class', 'fa', 'sa', 'exam'];
export const requiredKeys = [];

const schema = RxSchema.create({
  title: 'Card Schema',
  version: 0,
  description: 'stores students cards result',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string'
    },
    subject: {
      type: 'string'
    },
    class: {
      type: 'string'
    },
    fa: {
      type: 'number'
    },
    sa: {
      type: 'number'
    },
    exam: {
      type: 'number'
    }
  },
  required: requiredKeys
});

export const cardKollection = (async function heros() {
  const db = await RxDB.create({
    name: 'carddemodb',
    adapter: 'memory'
  });

  const cards = await db.collection({
    name: 'cards',
    schema
  });
  return cards;
})();

export class CardDB {
  public _db: RxCollection<Card>;

  constructor() {
    this.setupDb();
  }

  async setupDb() {
    this._db = await cardKollection;
    global['db'] = this._db;
  }

  save(data: Card) {
    console.log(data);
    // if (!this.validate(data)) {
    //     return;
    // }
    console.log('1', data);
    return this._db.findOne({ id: data.id }).$.switchMap(result => {
      console.log('2', data, result);
      if (result && (result as any).id) {
        return Observable.fromPromise(this._db.upsert(data));
      }
      return Observable.fromPromise(this._db.insert(data));
    });
  }

  studentNames() {
    return this._db.find({}).$.map(e => {
      console.log(e);
      if (isArray(e)) {
        return (e as Card[]).map(card => card.name);
      }
      return [(e as any).name] as string[];
    }); // as any as Observable<string[]>;
  }

  studentResult(name: string) {
    return this._db.findOne({ name }).sort('subject').$;
  }

  record(subject: string, lass: string) {
    return this._db.find({ subject, class: lass }).sort('name').$;
  }

  removeGroup(id: string[] | string) {
    if (!isArray(id)) {
      id = [id] as string[];
    }
    this._db.find({ id }).remove();
  }

  validate(data: Card) {
    return [...requiredKeys, 'id'].every(key => data[key]);
  }
}
