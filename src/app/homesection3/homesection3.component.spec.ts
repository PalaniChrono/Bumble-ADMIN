import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Homesection3Component } from './homesection3.component';

describe('Homesection3Component', () => {
  let component: Homesection3Component;
  let fixture: ComponentFixture<Homesection3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Homesection3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Homesection3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
