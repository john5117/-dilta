/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BusarRecieptFormPageComponent } from './busar-reciept-form-page.component';

describe('BusarRecieptFormPageComponent', () => {
  let component: BusarRecieptFormPageComponent;
  let fixture: ComponentFixture<BusarRecieptFormPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BusarRecieptFormPageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BusarRecieptFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
