import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LashTalkSecOneComponent } from './lash-talk-sec-one.component';

describe('LashTalkSecOneComponent', () => {
  let component: LashTalkSecOneComponent;
  let fixture: ComponentFixture<LashTalkSecOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LashTalkSecOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LashTalkSecOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
