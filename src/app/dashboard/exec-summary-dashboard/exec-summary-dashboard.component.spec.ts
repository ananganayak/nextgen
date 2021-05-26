import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecSummaryDashboardComponent } from './exec-summary-dashboard.component';

describe('ExecSummaryDashboardComponent', () => {
  let component: ExecSummaryDashboardComponent;
  let fixture: ComponentFixture<ExecSummaryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecSummaryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecSummaryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
