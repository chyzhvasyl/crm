import { TestBed, inject } from '@angular/core/testing';

import { DoctorDataService } from './doctor-data.service';

describe('DoctorDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorDataService]
    });
  });

  it('should be created', inject([DoctorDataService], (service: DoctorDataService) => {
    expect(service).toBeTruthy();
  }));
});
