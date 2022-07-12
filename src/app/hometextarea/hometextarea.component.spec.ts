import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HometextareaComponent } from './hometextarea.component';

describe('HometextareaComponent', () => {
  let component: HometextareaComponent;
  let fixture: ComponentFixture<HometextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
