import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFeature } from '@dilta/auth-module';
import { DreamUserService } from '@dilta/dream-users/src/lib/services/dream-users.service';
import { User } from '@dilta/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { combineLatest, exhaustMap, map } from 'rxjs/operators';


export interface UserBiodataParam {
  id: string;
}

export class UserBiodataProfilePageBase implements OnInit {
  public isEditable$: Observable<boolean>;

  /** allows editable */

  /** userBiodata */
  public userBio$: Observable<User>;

  constructor(
    private store: Store<any>,
    private actr: ActivatedRoute,
    private route: Router,
    private users: DreamUserService
  ) {}

  onEdit($event: boolean) {
    if ($event) {
      this.route.navigate(['biodata']);
    }
  }


  /** check if edit is allowed */
  isEditable(biodata: Observable<User>) {
    return this.store.select(AuthFeature)
      .pipe(
        map(( { details }) => details),
        combineLatest(biodata),
        map(([auth, user]) => auth.id === user.authId)
      );
  }

  /** gets the user biodata */
  getBiodata() {
    return this.actr.params
      .pipe(
        map(({ id }: UserBiodataParam) => id),
        exhaustMap(this.users.retrieve$)
      );
  }

  ngOnInit() {
    this.userBio$ = this.getBiodata();
    this.isEditable$ = this.isEditable(this.userBio$);
  }
}
