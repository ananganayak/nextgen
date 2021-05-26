import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVisualDashboardComponent } from './service-visual-dashboard.component';

describe('ServiceVisualDashboardComponent', () => {
  let component: ServiceVisualDashboardComponent;
  let fixture: ComponentFixture<ServiceVisualDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceVisualDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceVisualDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
