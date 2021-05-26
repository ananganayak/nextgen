import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtGenSupportDashboardComponent } from './nxt-gen-support-dashboard.component';

describe('NxtGenSupportDashboardComponent', () => {
  let component: NxtGenSupportDashboardComponent;
  let fixture: ComponentFixture<NxtGenSupportDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NxtGenSupportDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NxtGenSupportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
