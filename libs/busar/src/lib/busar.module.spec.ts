import { async, TestBed } from '@angular/core/testing';
import { BusarModule } from './busar.module';

describe('BusarModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [BusarModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(BusarModule).toBeDefined();
  });
});
