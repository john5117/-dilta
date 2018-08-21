import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { RetrieveSchoolAction, SchoolActionFailure, SchoolActions, SchoolActionSuccess } from './school.actions';
import { SchoolService } from './school.service';

@Injectable()
export class SchoolEffect {
  @Effect()
  currentSchool$ = this.action
    .ofType<RetrieveSchoolAction>(SchoolActions.RetrieveSchool)
    .pipe(
      exhaustMap(action => {
        return this.school
          .currentSchool()
          .pipe(
            map(school => new SchoolActionSuccess(school)),
            catchError(err => of(new SchoolActionFailure(err)))
          );
      })
    );

  constructor(private action: Actions, private school: SchoolService) {}
}
