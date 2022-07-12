import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSecTwoComponent } from './trainer-sec-two.component';

describe('TrainerSecTwoComponent', () => {
  let component: TrainerSecTwoComponent;
  let fixture: ComponentFixture<TrainerSecTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerSecTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSecTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
