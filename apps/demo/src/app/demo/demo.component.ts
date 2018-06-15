import * as faker from 'faker';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { BarComponent } from '@swimlane/ngx-charts';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  classes,
  examList,
  levels,
  schoolList,
  scoreGen,
  sessions,
  studentList,
  subjects,
  terms
} from '@dilta/generator';
import { DynamicGrid } from './examples';
import {
  humanizeBytes,
  UploaderOptions,
  UploadFile,
  UploadInput,
  UploadOutput
} from 'ngx-uploader';
import { KeysConfig } from '@dilta/commonwebui/src/dynamic-datagrid';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { series, single } from '@dilta/screwbox';
import { SortOrder } from 'clarity-angular';
import { Student } from '@dilta/commonwebui';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

window['studentList'] = studentList;

const ExamGrid = DynamicGrid.DynamicDataGridScoreExample;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit, AfterViewInit {
  private _i = -1;

  reciept = {
    teacherId: 'myId',
    teacherName: 'teacherName'
  };

  teacher = {
    universalId: 'universalId ',
    name: 'universal name'
  };

  exam = new ExamGrid();

  chartType = 'BarVerticalComponent';
  data = examList(30);
  // .map(e => {
  //   (e as any).total = e.fa + e.sa + e.exam;
  //   e.name = 'lorem king';
  //   e.class = 'pry 1';
  //   e.session = '2013/2014';
  //   return e;
  // });
  fieldconfig = [
    { field: 'name', type: 'string' },
    { field: 'session', type: 'string' },
    { field: 'subject', type: 'string' },
    { field: 'class', type: 'string' },
    { field: 'term', type: 'string' },
    { field: 'fa', type: 'number' },
    // { field: 'total', type: 'number' },
    { field: 'sa', type: 'number' },
    { field: 'exam', type: 'number' }
  ];
  config = {
    schemeType: 'ordinal'
  };

  subjects = subjects;
  classes = classes;
  levels = levels;
  terms = terms;
  sessions = sessions;

  title = `App works !`;
  view = [600, 360];
  single;
  t = true;
  f = false;

  constructor(private _router: Router) {
    this.single = single(examList(200), { name: 'name', value: 'exam' });
  }

  get i() {
    return this._i;
  }
  set i(value) {
    if (value === 10) {
      console.log({ value });
      this._router.navigateByUrl('demo/exam');
    }
    this._i = value;
  }

  next() {
    this.i++;
  }

  ngOnInit() {
    console.log(`1`);
  }

  ngAfterViewInit() {
    console.log(`2`);
  }
}

// this.variableLengthUsers =  new BehaviorSubject(this.display);
