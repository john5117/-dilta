
import { async, TestBed } from '@angular/core/testing';
import { DreamUsersModule } from './dream-users.module';

describe('DreamUsersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DreamUsersModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(DreamUsersModule).toBeDefined();
  });
});
      