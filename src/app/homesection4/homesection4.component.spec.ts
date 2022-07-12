import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Homesection4Component } from './homesection4.component';

describe('Homesection4Component', () => {
  let component: Homesection4Component;
  let fixture: ComponentFixture<Homesection4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Homesection4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Homesection4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
