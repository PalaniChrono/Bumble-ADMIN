import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LashTalkSecThreeComponent } from './lash-talk-sec-three.component';

describe('LashTalkSecThreeComponent', () => {
  let component: LashTalkSecThreeComponent;
  let fixture: ComponentFixture<LashTalkSecThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LashTalkSecThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LashTalkSecThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
