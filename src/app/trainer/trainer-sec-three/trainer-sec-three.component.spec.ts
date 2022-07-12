import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSecThreeComponent } from './trainer-sec-three.component';

describe('TrainerSecThreeComponent', () => {
  let component: TrainerSecThreeComponent;
  let fixture: ComponentFixture<TrainerSecThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerSecThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSecThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
