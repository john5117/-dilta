/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcessEffectService } from './process.service';

describe('Service: Process', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessEffectService]
    });
  });

  it(
    'should ...',
    inject([ProcessEffectService], (service: ProcessEffectService) => {
      expect(service).toBeTruthy();
    })
  );
});
