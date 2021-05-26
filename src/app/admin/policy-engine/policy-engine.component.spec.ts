import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyEngineComponent } from './policy-engine.component';

describe('PolicyEngineComponent', () => {
  let component: PolicyEngineComponent;
  let fixture: ComponentFixture<PolicyEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
