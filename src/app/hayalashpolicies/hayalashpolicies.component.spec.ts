import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HayalashpoliciesComponent } from './hayalashpolicies.component';

describe('HayalashpoliciesComponent', () => {
  let component: HayalashpoliciesComponent;
  let fixture: ComponentFixture<HayalashpoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HayalashpoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HayalashpoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
