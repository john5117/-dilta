import { async, TestBed } from '@angular/core/testing';
import { EmbededdbModule } from './embededdb.module';

describe('EmbededdbModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [EmbededdbModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(EmbededdbModule).toBeDefined();
  });
});
