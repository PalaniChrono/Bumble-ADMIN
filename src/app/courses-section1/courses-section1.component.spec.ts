import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSection1Component } from './courses-section1.component';

describe('CoursesSection1Component', () => {
  let component: CoursesSection1Component;
  let fixture: ComponentFixture<CoursesSection1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesSection1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
