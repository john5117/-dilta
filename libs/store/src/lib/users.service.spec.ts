/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDataService } from './users.service';

describe('Service: Users', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });
  });

  it(
    'should ...',
    inject([UserDataService], (service: UserDataService) => {
      expect(service).toBeTruthy();
    })
  );
});
