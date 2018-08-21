import { TestBed, inject } from '@angular/core/testing';

import { DreamUsersService } from './dream-users.service';

describe('DreamUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DreamUsersService]
    });
  });

  it('should be created', inject([DreamUsersService], (service: DreamUsersService) => {
    expect(service).toBeTruthy();
  }));
});
