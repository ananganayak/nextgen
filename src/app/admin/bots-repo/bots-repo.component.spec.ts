import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotsRepoComponent } from './bots-repo.component';

describe('BotsRepoComponent', () => {
  let component: BotsRepoComponent;
  let fixture: ComponentFixture<BotsRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotsRepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotsRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
