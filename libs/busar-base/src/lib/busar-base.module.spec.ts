import { async, TestBed } from '@angular/core/testing';
import { BusarBaseModule } from './busar-base.module';

describe('BusarBaseModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [BusarBaseModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(BusarBaseModule).toBeDefined();
  });
});
