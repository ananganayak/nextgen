import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelliDcmComponent } from './intelli-dcm.component';

describe('IntelliDcmComponent', () => {
  let component: IntelliDcmComponent;
  let fixture: ComponentFixture<IntelliDcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntelliDcmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelliDcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
