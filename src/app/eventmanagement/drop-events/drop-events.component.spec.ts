import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropEventsComponent } from './drop-events.component';

describe('DropEventsComponent', () => {
  let component: DropEventsComponent;
  let fixture: ComponentFixture<DropEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
