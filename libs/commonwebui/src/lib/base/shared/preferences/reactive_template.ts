import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export type ReactivePreferenceBaseInput<T> = { [p in keyof T]: string };

interface ReactivePreferenceBaseInputViewMap  { field: string; value: string; }

/**
 * Manages A Single ReactivePreferenceBase
 *
 * @export
 * @class ReactivePreferenceBase
 * @implements {OnInit}
 */
export class ReactivePreferenceBase implements OnInit {

  /**
   * recieves input for the prefernceTemplateComponent
   *
   * @type {ReactivePreferenceBaseInput<any>}
   * @memberof ReactivePreferenceBase
   */
  @Input() setting: ReactivePreferenceBaseInput<any> = {};
  /**
   * The Keys is editable else false
   *
   * @memberof ReactivePreferenceBase
   */
  @Input() keyEditable = false;

  /**
   * button to emit values else changes contiousl emitted
   *
   * @memberof ReactivePreferenceBase
   */
  @Input() btnUpdate = false;

  /**
   * event emitter
   *
   * @memberof ReactivePreferenceBase
   */
  @Output() emitter = new EventEmitter();


  /**
   * view form group dynamcally created
   *
   * @type {FormGroup}
   * @memberof ReactivePreferenceBase
   */
  dynamicForm: FormGroup;

  /**
   * List of formgroup keys
   *
   * @type {string[]}
   * @memberof ReactivePreferenceBase
   */
  viewInputs: string[] = [];

  /**
   *Creates an instance of ReactivePreferenceBase.
   * @param {FormBuilder} fb
   * @memberof ReactivePreferenceBase
   */
  constructor(private fb: FormBuilder) {}


  /**
   * Updates emits the value to the base component
   *
   * @param {ReactivePreferenceBaseInput<any>} value
   * @memberof ReactivePreferenceBase
   */
  update<T>(formValue: ReactivePreferenceBaseInput<ReactivePreferenceBaseInputViewMap>) {
    const _obj = {};
    const { field, value } = formValue;
    _obj[field] = value;
    this.emitter.emit(_obj);
  }


  /**
   * initialize form with default values
   *
   * @param {ReactivePreferenceBaseInput<any>} value
   * @returns
   * @memberof ReactivePreferenceBase
   */
  setupForm(value: ReactivePreferenceBaseInput<any>) {
    const setting: ReactivePreferenceBaseInputViewMap = {} as any;
    Object.keys(value).forEach(key => {
      setting.field = key;
      setting.value = value[key];
    });
    return this.fb.group(setting);
  }

  ngOnInit() {
    this.dynamicForm = this.setupForm(this.setting);
    this.viewInputs = Object.keys(this.dynamicForm.controls);
  }
}



/**
 * Manages A List ReactivePreferenceBase
 *
 * @export
 * @class ReactivePreferenceListBase
 * @implements {OnInit}
 */
export class ReactivePreferenceListBase implements OnInit {


  /**
   * recieves input for the prefernceTemplateComponent
   *
   * @type {ReactivePreferenceListBase<any[]>}
   * @memberof ReactivePreferenceBase
   */
  @Input() settings: ReactivePreferenceBaseInput<any>[] = [];
  @Input() title;
  @Input() keyEditable = false;
  @Input() menuOperations = false;

  @Output() emitter = new EventEmitter();

  constructor() {}

  saveList(settings: ReactivePreferenceBaseInput<any>[]) {
    this.emitter.emit(settings);
  }

  /**
   * Add a new item to the list
   *
   * @memberof ReactivePreferenceListBase
   */
  addToList() {
    this.settings.push({ 'name': 'value' });
  }

  /**
   * removes the item with the index from the list
   *
   * @param {number} index
   * @memberof ReactivePreferenceListBase
   */
  removeFromList(index: number) {
    this.settings = this.settings.filter((v, i) => i !== index);
  }

  updateList(index: number, value: ReactivePreferenceBaseInput<any>) {
    console.log(index, value);
    this.settings[index] = value;
  }

  emit(value) {
    this.emitter.emit(value);
  }

  ngOnInit() {}
}
