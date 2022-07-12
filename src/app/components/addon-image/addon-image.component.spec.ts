import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonImageComponent } from './addon-image.component';

describe('AddonImageComponent', () => {
  let component: AddonImageComponent;
  let fixture: ComponentFixture<AddonImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddonImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
