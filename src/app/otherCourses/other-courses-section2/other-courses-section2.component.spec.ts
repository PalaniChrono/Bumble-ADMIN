import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCoursesSection2Component } from './other-courses-section2.component';

describe('OtherCoursesSection2Component', () => {
  let component: OtherCoursesSection2Component;
  let fixture: ComponentFixture<OtherCoursesSection2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherCoursesSection2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCoursesSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
