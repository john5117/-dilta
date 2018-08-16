/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BusarPreferencesComponent } from './busar-preferences.component';

describe('BusarPreferencesComponent', () => {
  let component: BusarPreferencesComponent;
  let fixture: ComponentFixture<BusarPreferencesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BusarPreferencesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BusarPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
