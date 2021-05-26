import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownsComponent } from './unknowns.component';

describe('UnknownsComponent', () => {
  let component: UnknownsComponent;
  let fixture: ComponentFixture<UnknownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnknownsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
