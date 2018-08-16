import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from 'clarity-angular';
import { SubComponentsModule } from './../../subcomponents/subcomponents.module';

import { DemoComponent } from './demo.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [DemoComponent],
        imports: [ClarityModule, SubComponentsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
