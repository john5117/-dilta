
import { async, TestBed } from '@angular/core/testing';
import { PlatformConfigModule } from './platform-config.module';

describe('PlatformConfigModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PlatformConfigModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(PlatformConfigModule).toBeDefined();
  });
});
      