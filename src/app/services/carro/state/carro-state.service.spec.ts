import { TestBed } from '@angular/core/testing';

import { CarroStateService } from './carro-state.service';

describe('CarroStateService', () => {
  let service: CarroStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarroStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
