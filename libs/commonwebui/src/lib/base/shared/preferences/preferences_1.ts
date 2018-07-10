import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface PreferenceViewInputValue {
  name: string;
  value: number | string;
  type?: string;
  config?: PreferenceViewInputConfig;
}

export interface PreferenceViewInputConfig {
  select?: { name: string }[];
}

export class PreferencesFormBase implements OnInit {
  @Input() settings: PreferenceViewInputValue[];
  @Input() title = 'Form Title';
  @Input() key_value = false;
  @Input() menus: { name: string }[] = [];
  @Input() classes: string[] = [];

  @Output() emitter = new EventEmitter();

  viewInputs: Partial<PreferenceViewInputValue>[] = [];

  public dynamicForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  createDynamicForm(defaults: PreferenceViewInputValue[] = []) {
    if (this.key_value) {
      defaults.push({ name: 'title', value: this.title || 'title' });
    }
    // create dynamic form
    const _setting = {};
    defaults.forEach(value => {
      _setting[value.name] = [value.value];
    });
    return this.fb.group(_setting);
  }

  addControl(name?: string, type = 'text', config?: PreferenceViewInputConfig) {
    const formId = name ? name : `field_${this.viewInputs.length - 1}`;
    if (this.dynamicForm.controls[formId]) {
      return;
    }
    this.dynamicForm.addControl(`${formId}`, new FormControl());
    if ( config && config.select) {
      this.dynamicForm.get(formId).setValue(config.select[0].name);
    }
    this.viewInputs.push({ name: formId, type, config });
  }

  updateViewInputs() {
    let views: Partial<PreferenceViewInputValue>[] = [];
    if (this.dynamicForm) {
      views = Object.keys(this.dynamicForm.controls).map(e =>
        Object.assign({ name: e, type: 'text' })
      );
    }
    return views;
  }

  emit() {
    this.emitter.emit({
      key_value: this.key_value,
      title: this.title,
      event: this.dynamicForm.value
    } as any);
  }

  addclassMetas() {
    this.classes.forEach(e => {
      this.addControl(e);
    });
  }

  ngOnInit() {
    this.dynamicForm = this.createDynamicForm(this.settings);
    this.viewInputs = this.updateViewInputs();
    if (this.key_value) {
      this.addControl('menu', 'select', {
        select: this.menus.filter(e => e.name !== 'Add')
      });
    }
  }
}
