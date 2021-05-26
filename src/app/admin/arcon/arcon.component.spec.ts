import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArconComponent } from './arcon.component';

describe('ArconComponent', () => {
  let component: ArconComponent;
  let fixture: ComponentFixture<ArconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
