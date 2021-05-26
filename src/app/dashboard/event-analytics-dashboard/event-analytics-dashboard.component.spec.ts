import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAnalyticsDashboardComponent } from './event-analytics-dashboard.component';

describe('EventAnalyticsDashboardComponent', () => {
  let component: EventAnalyticsDashboardComponent;
  let fixture: ComponentFixture<EventAnalyticsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAnalyticsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAnalyticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
