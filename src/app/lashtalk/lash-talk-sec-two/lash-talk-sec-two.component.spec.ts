import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LashTalkSecTwoComponent } from './lash-talk-sec-two.component';

describe('LashTalkSecTwoComponent', () => {
  let component: LashTalkSecTwoComponent;
  let fixture: ComponentFixture<LashTalkSecTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LashTalkSecTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LashTalkSecTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
