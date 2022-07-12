import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaryComponent } from './vary.component';

describe('VaryComponent', () => {
  let component: VaryComponent;
  let fixture: ComponentFixture<VaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
