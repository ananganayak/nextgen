import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormbuildingComponent } from './formbuilding.component';

describe('FormbuildingComponent', () => {
  let component: FormbuildingComponent;
  let fixture: ComponentFixture<FormbuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormbuildingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormbuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
