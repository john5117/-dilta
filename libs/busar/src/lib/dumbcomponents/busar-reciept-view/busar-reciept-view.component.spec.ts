/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BusarRecieptViewComponent } from './busar-reciept-view.component';

describe('BusarRecieptViewComponent', () => {
  let component: BusarRecieptViewComponent;
  let fixture: ComponentFixture<BusarRecieptViewComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BusarRecieptViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BusarRecieptViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
