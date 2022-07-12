import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSecOneComponent } from './trainer-sec-one.component';

describe('TrainerSecOneComponent', () => {
  let component: TrainerSecOneComponent;
  let fixture: ComponentFixture<TrainerSecOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerSecOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSecOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
