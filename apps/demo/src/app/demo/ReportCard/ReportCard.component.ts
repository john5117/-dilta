import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  classKeyConfig,
  studentKeyConfig,
  classList,
  subjectList,
  format,
  Card,
  remark
} from './utils';
import { CardDB } from './ReportCard.database';
import { KeysConfig } from '@dilta/commonwebui/src/dynamic-datagrid';
import { random, take } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

function cardDefault(className: string, subject: string): Card {
  return {
    subject,
    class: className,
    exam: 0,
    fa: 0,
    name: '',
    sa: 0,
    id: `${Date.now()}:${random(120, 3000)}:${Date.now()}`
  };
}

@Component({
  selector: 'app-report-card',
  templateUrl: './ReportCard.component.html',
  styleUrls: ['./ReportCard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportCardComponent extends CardDB implements OnInit {
  public classKeys = classKeyConfig;
  public expEval = 'total = fa + sa + exam';

  private _classList = classList;
  private _subjectList = subjectList;
  private _formatList = format;
  private _subject;
  private _class;
  private _format;
  private _stdCount = 0;
  private _student;

  private _scores: Card[] = [];
  private _studentList = Observable.of<string[]>([]);

  config = new BehaviorSubject<KeysConfig[]>(classKeyConfig);

  constructor(private _cdref: ChangeDetectorRef, private _r: Router) {
    super();
  }

  newData(data: { data: Card }) {
    console.log(data.data);
    delete (data.data as any).total;
    this._db
      .upsert(data.data)
      .then(console.log)
      .catch(console.log);
    this._db
      .find({})
      .exec()
      .then(console.log)
      .catch(console.log);
  }

  get format() {
    return this._format;
  }
  set format(value) {
    this._format = value;
    if (value !== 'Group') {
      // this._studentList.switchMap((data) => this.studentNames())
      if (this._db) {
        this._studentList = this.studentNames();
      }
      this.config.next(studentKeyConfig);
      return;
    }
    this.config.next(classKeyConfig);
  }

  get formatList() {
    return this._formatList;
  }

  get classList() {
    return this._classList;
  }

  get subjectList() {
    return this._subjectList;
  }

  get subject() {
    return this._subject;
  }
  set subject(value) {
    this.scores = [];
    this._subject = value;
  }
  get class() {
    return this._class;
  }
  set class(value) {
    // this._db.find({ class: value })
    //   .$.subscribe((data) => this.scores = (data) ? data : [])
    this._class = value;
  }

  get stdCount() {
    return this._stdCount;
  }

  set stdCount(value) {
    if (
      !this._class ||
      !this._subject ||
      value < 0 ||
      value === this._stdCount
    ) {
      return;
    }
    if (value < this._stdCount) {
      this.scores = take(this.scores, value);
      this._stdCount = value;
      return;
    }
    if (value > this._stdCount) {
      const _increase = value - this._stdCount;
      for (let i = 0; i < _increase; i++) {
        this.scores.push(cardDefault(this._class, this._subject));
      }
      this._stdCount = value;
    }
  }

  get scores() {
    return this._scores;
  }
  set scores(value) {
    this._scores = value;
  }

  get studentList() {
    return this._studentList;
  }

  get student() {
    return this._student;
  }
  set student(value) {
    this._db
      .find({ name: value })
      .exec()
      .then(data => {
        data = (data as Card[]).map(element => {
          const { exam, fa, id, name, sa, subject } = element;
          const total = fa + sa + exam;
          return {
            class: element.class,
            fa,
            id,
            name,
            subject,
            sa,
            exam,
            total,
            remark: remark(total)
          };
        }) as any;
        this.expEval = undefined;
        this.scores = data as Card[];
      });
    // .subscribe((data) => this.scores = data as Card[]);
    this._student = value;
  }

  home() {
    this._r.navigateByUrl('');
  }

  ngOnInit() {}
}
