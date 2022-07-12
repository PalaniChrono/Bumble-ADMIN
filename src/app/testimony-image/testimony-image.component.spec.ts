import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyImageComponent } from './testimony-image.component';

describe('TestimonyImageComponent', () => {
  let component: TestimonyImageComponent;
  let fixture: ComponentFixture<TestimonyImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonyImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
