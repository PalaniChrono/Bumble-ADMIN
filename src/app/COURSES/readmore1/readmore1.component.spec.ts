import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Readmore1Component } from './readmore1.component';

describe('Readmore1Component', () => {
  let component: Readmore1Component;
  let fixture: ComponentFixture<Readmore1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Readmore1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Readmore1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
