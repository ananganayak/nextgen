import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredStoreComponent } from './cred-store.component';

describe('CredStoreComponent', () => {
  let component: CredStoreComponent;
  let fixture: ComponentFixture<CredStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
