import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Homesection2Component } from './homesection2.component';

describe('Homesection2Component', () => {
  let component: Homesection2Component;
  let fixture: ComponentFixture<Homesection2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Homesection2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Homesection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
