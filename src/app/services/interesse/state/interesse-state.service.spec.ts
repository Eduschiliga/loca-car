import { TestBed } from '@angular/core/testing';

import { InteresseStateService } from './interesse-state.service';

describe('InteresseStateService', () => {
  let service: InteresseStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteresseStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
