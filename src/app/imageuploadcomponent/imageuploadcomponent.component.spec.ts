import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageuploadcomponentComponent } from './imageuploadcomponent.component';

describe('ImageuploadcomponentComponent', () => {
  let component: ImageuploadcomponentComponent;
  let fixture: ComponentFixture<ImageuploadcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageuploadcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploadcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
