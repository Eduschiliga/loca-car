import { TestBed } from '@angular/core/testing';

import { CarroApiService } from './carro-api.service';

describe('CarroApiService', () => {
  let service: CarroApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarroApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
