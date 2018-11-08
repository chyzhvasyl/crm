import { TestBed, inject } from '@angular/core/testing';

import { CardinfoService } from './cardinfo.service';

describe('CardinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardinfoService]
    });
  });

  it('should be created', inject([CardinfoService], (service: CardinfoService) => {
    expect(service).toBeTruthy();
  }));
});
