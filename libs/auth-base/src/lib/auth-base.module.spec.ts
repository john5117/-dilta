
import { async, TestBed } from '@angular/core/testing';
import { AuthBaseModule } from './auth-base.module';

describe('AuthBaseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AuthBaseModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(AuthBaseModule).toBeDefined();
  });
});
      