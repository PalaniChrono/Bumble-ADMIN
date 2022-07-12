import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCoursesSection3Component } from './other-courses-section3.component';

describe('OtherCoursesSection3Component', () => {
  let component: OtherCoursesSection3Component;
  let fixture: ComponentFixture<OtherCoursesSection3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherCoursesSection3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCoursesSection3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
