import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancesReportComponent } from './performances-report.component';

describe('PerformancesReportComponent', () => {
  let component: PerformancesReportComponent;
  let fixture: ComponentFixture<PerformancesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformancesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
