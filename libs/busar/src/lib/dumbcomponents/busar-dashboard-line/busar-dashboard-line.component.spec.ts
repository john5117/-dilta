/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BusarDashboardLineComponent } from './busar-dashboard-line.component';

describe('BusarDashboardLineComponent', () => {
  let component: BusarDashboardLineComponent;
  let fixture: ComponentFixture<BusarDashboardLineComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BusarDashboardLineComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BusarDashboardLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
