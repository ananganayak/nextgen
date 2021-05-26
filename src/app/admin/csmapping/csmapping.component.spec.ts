import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsmappingComponent } from './csmapping.component';

describe('CsmappingComponent', () => {
  let component: CsmappingComponent;
  let fixture: ComponentFixture<CsmappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsmappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
