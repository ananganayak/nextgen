import { TestBed } from '@angular/core/testing';

import { MonitroingServiceService } from './monitroing-service.service';

describe('MonitroingServiceService', () => {
  let service: MonitroingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitroingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
