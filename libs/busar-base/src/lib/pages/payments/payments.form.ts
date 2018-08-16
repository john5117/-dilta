import { OnInit } from '@angular/core';
import { School, Setting, SettingPreference, User } from '@dilta/models';
import { dictSchool } from '@dilta/presets';
import { processFeature, ProcessState } from '@dilta/process';
import { AuthFeature, Authsuccess, SchoolService } from '@dilta/store';
import { select, Store } from '@ngrx/store';
import { isNil } from 'lodash';
import { Observable } from 'rxjs/observable';
import { combineLatest, map, skipWhile } from 'rxjs/operators';
import { BusarFeature } from '../../store/busar.effects';

// expected store mapping interface required for this component
interface DashBoardStore {
  Auth: Authsuccess;
  busary: Setting;
}

/**
 * inputs expected by the view
 *
 * @interface LocalInputs
 */
interface LocalInputs {
  teacher: User;
  termList: string[];
  sessionList: string[];
  classList: string[];
}

/**
 * get inputs names for any submenu as a single array
 *
 * @param {SettingPreference} menu
 * @returns
 */
function inputNames(menu: SettingPreference) {
  return menu.inputs.map(({ name }: { name: string }) => name);
}

/**
 * remap the states
 *
 * @param {*} state
 * @returns
 */
function localInputStateSelector(state: any) {
  const p = processFeature(state);
  const b = BusarFeature(state);
  const a = AuthFeature(state);
  return remap(p, b, a);
}

function remap(p: ProcessState, b: Setting, a: Authsuccess): LocalInputs {
  const settings = b
    ? b.settings ? (b.settings as any).others.submenus : null
    : null;
  return {
    teacher: a.user,
    termList: settings ? inputNames(settings.termList) : [],
    sessionList: settings ? inputNames(settings.sessionList) : [],
    classList: []
  };
}

interface EntitySchool {
  id: string;
  changes: School;
}

export class BusarPaymentBase implements OnInit {
  localStore$: Observable<LocalInputs>;

  constructor(
    public store: Store<DashBoardStore>,
    public school: SchoolService
  ) {}

  /**
   * sets the localstore to remaped inputs for the view
   *
   * @memberof BusarDashBoardBase
   */
  storeListen() {
    this.localStore$ = this.store.pipe(
      select(localInputStateSelector),
      combineLatest(
        this.school.entities$.pipe(map(e => e[0]), skipWhile(isNil))
      ),
      map(this.remapInput),
      skipWhile(
        ({ sessionList, teacher }) => sessionList === [] || isNil(teacher)
      )
    );
  }

  // @memoize(this, 'remapInput', 'remapInput')
  remapInput([localInputs, school]: [LocalInputs, EntitySchool]): LocalInputs {
    const classList = dictSchool(school.changes.category).classes;
    return { ...localInputs, classList };
  }

  ngOnInit() {
    this.storeListen();
  }
}
