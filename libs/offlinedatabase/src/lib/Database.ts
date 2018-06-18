import { Injectable } from '@angular/core';
import { OfflineDB } from '@dilta/models/src/rxdb/models';
import { Remote } from 'electron';
import { Observable } from 'rxjs/observable';

/**
 * Holder for the database for depenedcy injection
 *
 * @export
 * @class Database
 */
@Injectable()
export class Database {
  readonly db: Observable<OfflineDB> = (window['require']('electron')
    .remote as Remote).getGlobal('_databaseInit')[1];
  constructor() {}
}

function isElectron() {
  return window['process'] && window['require'];
}
