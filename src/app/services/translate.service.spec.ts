import { TestBed, inject } from '@angular/core/testing';

import { TranslatingService } from './translate.service';

describe('TranslateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslatingService]
    });
  });

  it('should be created', inject([TranslatingService], (service: TranslatingService) => {
    expect(service).toBeTruthy();
  }));
});
