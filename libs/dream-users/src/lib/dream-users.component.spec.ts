import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamUsersComponent } from './dream-users.component';

describe('DreamUsersComponent', () => {
  let component: DreamUsersComponent;
  let fixture: ComponentFixture<DreamUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
