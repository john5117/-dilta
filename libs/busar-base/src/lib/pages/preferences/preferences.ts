import { OnInit } from '@angular/core';
import { SettingPreference, Settings, Setting } from '@dilta/models';
import { dictSchool } from '@dilta/presets';
import { flatten, isNil } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { BusarFeature, BusarUpdate } from '../../store';
import {
  withLatestFrom,
  map,
  first,
  tap,
  debounce,
  delay,
  debounceTime,
  skipWhile
} from 'rxjs/operators';
import { set, get } from 'lodash';
import { autobind } from 'core-decorators';

interface IntialBusarPrefenceState {
  /**
   * View menus settings configurations
   *
   * @type {Settings}
   * @memberof IntialBusarPrefenceState
   */
  menus: Settings;

  /**
   * array of views [form names] displayed
   *
   * @type {string[]}
   * @memberof IntialBusarPrefenceState
   */
  views: string[];

  /**
   * currently displayed form
   *
   * @type {string}
   * @memberof IntialBusarPrefenceState
   */
  currentForm: string;

  /**
   * array of input values passed to the form
   *
   * @type {{}[]}
   * @memberof IntialBusarPrefenceState
   */
  settings: {}[];

  /**
   * link mapping to current location
   *
   * @type {string[]}
   * @memberof IntialBusarPrefenceState
   */
  path?: string[];

  /**
   * if the key field is editable
   *
   * @type {boolean}
   * @memberof IntialBusarPrefenceState
   */
  keyValueEditable: boolean;

  /**
   * if new input can be added to the old input lists
   *
   * @type {boolean}
   * @memberof IntialBusarPrefenceState
   */
  menuOperations: boolean;

  /**
   * Title [name] of the current form
   *
   * @type {string}
   * @memberof IntialBusarPrefenceState
   */
  title?: string;
}

/** initial state for the busar preference page reducer */
const intialState: IntialBusarPrefenceState = {
  menus: {} as any,
  views: [],
  currentForm: '',
  settings: {} as any,
  path: [],
  keyValueEditable: false,
  menuOperations: false
};

export class BusarPreferencesPageBase implements OnInit {
  /**
   * Local Async State holder for preferences
   *
   * @memberof BusarPreferencesPageBase
   */
  public sideBar$ = new BehaviorSubject(intialState);

  /**
   * listens for inputs to be saved
   *
   * @memberof BusarPreferencesPageBase
   */
  public onInput$ = new BehaviorSubject<{}[]>(undefined);

  constructor(private store: Store<any>) {}

  /**
   * select the input for the at the passed path
   *
   * @param {*} settings
   * @param {string[]} [parentView, childView]
   * @returns {{}[]}
   * @memberof BusarPreferencesPageBase
   */
  selectViewInputs(settings, [parentView, childView]: string[]): {}[] {
    return get(settings, this.inputPath([parentView, childView])) || [];
  }

  /**
   * changes the current preference view to another view
   *
   * @param {SettingPreference} menu
   * @returns
   * @memberof BusarPreferencesPageBase
   */
  changeView(menu: SettingPreference) {
    if (menu.name === this.sideBar$.value.currentForm) {
      return;
    }
    this.sideBar$.value.settings = [];
    const path = menu.link.split(':');
    this.sideBar$.next({
      ...this.sideBar$.value,
      title: `${menu.name} Settings`,
      currentForm: menu.name,
      path: path,
      menuOperations: path[0] === 'others',
      settings: this.selectViewInputs(this.sideBar$.value.menus, path)
    });
  }

  /**
   * maps path to the current input menu
   *
   * @param {string[]} [parent, child]
   * @returns {string}
   * @memberof BusarPreferencesPageBase
   */
  inputPath([parent, child]: string[]): string {
    if (!child) {
      return `${parent}.inputs`;
    }
    return `${parent}.submenus.${child}.inputs`;
  }

  /**
   * save Settings to the database
   *
   * @param {{}[]} $event
   * @memberof BusarPreferencesPageBase
   */
  saveInputs() {
    this.onInput$
      .pipe(
        skipWhile(input => isNil(input)),
        withLatestFrom(this.sideBar$, this.store.select(BusarFeature)),
        skipWhile(([inputs, sidebar, busary]) => isNil(busary)),
        map(this.remapInput),
        skipWhile(setting => isNil(setting))
      )
      .subscribe(value => {
        this.store.dispatch(new BusarUpdate(value));
      });
  }

  /**
   * Remaps the input to valid Settings by Updating the required Fields
   *
   * @param {[
   *     {}[],
   *     IntialBusarPrefenceState,
   *     Setting
   *   ]} [inputs, sidebar, busary]
   * @returns
   * @memberof BusarPreferencesPageBase
   */
  @autobind()
  remapInput([inputs, sidebar, busary]: [
    {}[],
    IntialBusarPrefenceState,
    Setting
  ]) {
    return <Setting>{
      ...busary,
      settings: set(sidebar.menus, this.inputPath(sidebar.path), inputs)
    };
  }

  appendToView(event: { title: string; menu: string }) {}

  /**
   * Sets Up the inital views for the preference page
   *
   * @param {Setting} { defaultView, settings }
   * @memberof BusarPreferencesPageBase
   */
  @autobind()
  defaultView({ defaultView, settings }: Setting) {
    const views = flatByKey(settings || {}, 'name');
    const path = defaultView ? defaultView.split(':') : intialState.path;
    this.sideBar$.next({
      ...this.sideBar$.value,
      views,
      settings:
        this.sideBar$.value.settings || this.selectViewInputs(settings, path),
      path: path,
      menus: settings,
      currentForm: this.sideBar$.value.currentForm || defaultView
    });
  }

  /**
   * listens for busary settings for the application
   *
   * @memberof BusarPreferencesPageBase
   */
  loadSettings() {
    this.store
      .select(BusarFeature)
      .pipe(skipWhile(busary => isNil(busary)))
      .subscribe(this.defaultView);
  }

  ngOnInit() {
    this.loadSettings();
    this.saveInputs();
  }
}

// TODO: Flat _settings to an array of a single level
function flatByKey<T>(sidebar: Settings, key: string) {
  const _items = Object.values(sidebar).map(e => e.name);
  const _subItems = flatten(
    Object.values(sidebar).map(e =>
      Object.values(e.submenus || {}).map(s => (s as any).name)
    )
  );
  return [..._items, ..._subItems];
}
