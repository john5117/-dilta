import { OnInit } from '@angular/core';
import { dictSchool } from '@dilta/presets';
import { flatten } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { SettingPreference, SettingState } from '../../../store';

const defaultView = 'schoolFee';

interface IntialBusarPrefenceState  {
  menus: SettingState;
  views: string[];
  currentForm: string;
  settings: {}[];
  keyValueEditable: boolean;
  menuOperations: boolean;
  title?: string;
}

/** initial state for the busar preference page reducer */
const intialState: IntialBusarPrefenceState = {
  menus: {} as any,
  views: [],
  currentForm: defaultView,
  settings: {} as any,
  keyValueEditable: false,
  menuOperations: true
};


export class BusarPreferencesPageBase implements OnInit {
  public sideBar$ = new BehaviorSubject(intialState);

  constructor() {}

  selectViewInputs([parentView, childView]: string[]) {
    console.log(parentView, childView);
    if (!childView) {
      return sideBar[parentView].inputs;
    }
    return sideBar[parentView].submenus[childView].inputs;
  }

  changeView(menu: SettingPreference) {
    console.log(menu);
    if (menu.name === this.sideBar$.value.currentForm ) {
      return;
    }
    this.sideBar$.value.settings =  [];
    this.sideBar$.next({
      ...this.sideBar$.value,
      title: `${menu.name} Settings`,
      currentForm: menu.name,
      settings: this.selectViewInputs(menu.link.split(':')) });
  }

  saveInputs($event: {}[]) {
    // TODO: dispacth to store from here
    this.sideBar$.value.settings = $event;
    console.log($event);
  }

  appendToView(event: { title: string; menu: string }) {
    'abey/john'.split('/').forEach(console.log);
  }

  ngOnInit() {
    this.sideBar$.next({
      menus: sideBar,
      views: flatByKey(sideBar, 'name'),
      currentForm: defaultView,
      settings: this.selectViewInputs(['revenue', defaultView]),
      keyValueEditable: false,
      menuOperations: false
    });
  }
}

const inputs = dictSchool('primary').classes.map(e => {
  const _obj = {};
  _obj[e] = '';
  return _obj;
});

const sideBar: SettingState = {
  revenue: {
    name: 'Revenue',
    link: 'revenue',
    enabled: true,
    submenus: {
      schoolFee: {
        enabled: true,
        name: defaultView,
        link: 'revenue:schoolFee',
        inputs,
      },
      uniform: {
        enabled: true,
        name: 'uniform',
        link: 'revenue:uniform',
        inputs,
      },
      transportation: {
        enabled: true,
        name: 'transportation',
        link: 'revenue:transportation',
        inputs,
      }
    }
  },
  expenses: {
    name: 'Expenses',
    link: 'Expenses',
    submenus: {
      'link 1': {
        enabled: false,
        name: 'link 1',
        link: 'link 1'
      },
      'link 2': {
        name: 'link 2',
        link: 'link 2'
      }
    }
  },
  Add: {
    name: 'Add',
    enabled: true,
    link: 'add'
  }
};

// TODO: Flat _settings to an array of a single level
function flatByKey<T>(sidebar: SettingState, key: string) {
  const _items = Object.values(sidebar).map(e => e.name);
  const _subItems = flatten(
    Object.values(sideBar).map(e =>
      Object.values(e.submenus || {}).map(s => s.name)
    )
  );
  console.log(_subItems);
  return [..._subItems, ..._items];
}

