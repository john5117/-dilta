import { Action } from '@ngrx/store';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/observable';

export abstract class ProcessEffectBase {
  /**
   * Effects to listen for the retrieval of the store
   * liensce key
   *
   * @abstract
   * @memberof ProcessEffectBase
   */
  @Effect() abstract getliensceKey$: Observable<Action>;

  /**
   * Effect listen for the deletation of liensce key
   *
   * @abstract
   * @memberof ProcessEffectBase
   */
  @Effect() abstract deleteliensceKey$: Observable<Action>;
  /**
   * Effects to listen for the update of liensce key
   *
   * @abstract
   * @memberof ProcessEffectBase
   */
  @Effect() abstract updateliensceKey$: Observable<Action>;
  /**
   * Effects to retrieve the schoolId
   *
   * @abstract
   * @memberof ProcessEffectBase
   */
  @Effect() abstract getSchoolId$: Observable<Action>;

  /**
   * Effects to Delete the school Id
   *
   * @abstract
   * @memberof ProcessEffectBase
   */
  @Effect() abstract deleteSchoolId$: Observable<Action>;
  /**
   * Effects to update the schoolId
   *
   * @abstract
   * @memberof ProcessEffectBase
   */
  @Effect() abstract updateSchoolId$: Observable<Action>;

  constructor() {}
}
