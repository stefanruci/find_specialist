import { TestBed } from '@angular/core/testing';

import { SpecialistServiceService } from './specialist-service.service';

describe('SpecialistServiceService', () => {
  let service: SpecialistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
