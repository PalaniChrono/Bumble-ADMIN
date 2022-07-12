import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LashcoursesComponent } from './lashcourses.component';

describe('LashcoursesComponent', () => {
  let component: LashcoursesComponent;
  let fixture: ComponentFixture<LashcoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LashcoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LashcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
