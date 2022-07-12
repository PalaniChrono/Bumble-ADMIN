import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Readmore3Component } from './readmore3.component';

describe('Readmore3Component', () => {
  let component: Readmore3Component;
  let fixture: ComponentFixture<Readmore3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Readmore3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Readmore3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
