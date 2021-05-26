import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeUplinkInOutComponent } from './edge-uplink-in-out.component';

describe('EdgeUplinkInOutComponent', () => {
  let component: EdgeUplinkInOutComponent;
  let fixture: ComponentFixture<EdgeUplinkInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeUplinkInOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeUplinkInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
