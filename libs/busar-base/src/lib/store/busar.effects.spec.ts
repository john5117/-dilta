import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BusarEffects } from './busar.effects';

describe('BusarService', () => {
  let actions$: Observable<any>;
  let effects: BusarEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusarEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(BusarEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
