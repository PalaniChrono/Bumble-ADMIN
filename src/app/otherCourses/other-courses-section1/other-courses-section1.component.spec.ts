import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCoursesSection1Component } from './other-courses-section1.component';

describe('OtherCoursesSection1Component', () => {
  let component: OtherCoursesSection1Component;
  let fixture: ComponentFixture<OtherCoursesSection1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherCoursesSection1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCoursesSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
