import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoClassficationDashboardComponent } from './auto-classfication-dashboard.component';

describe('AutoClassficationDashboardComponent', () => {
  let component: AutoClassficationDashboardComponent;
  let fixture: ComponentFixture<AutoClassficationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoClassficationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoClassficationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
