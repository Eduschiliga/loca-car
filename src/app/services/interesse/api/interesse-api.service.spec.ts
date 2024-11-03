import { TestBed } from '@angular/core/testing';

import { InteresseApiService } from './interesse-api.service';

describe('InteresseApiService', () => {
  let service: InteresseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteresseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
