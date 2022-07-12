import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialImguploadComponent } from './testimonial-imgupload.component';

describe('TestimonialImguploadComponent', () => {
  let component: TestimonialImguploadComponent;
  let fixture: ComponentFixture<TestimonialImguploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialImguploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialImguploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
