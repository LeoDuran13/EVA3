import { TestBed } from '@angular/core/testing';

import { LocacionServicesService } from './locacion-services.service';

describe('LocacionServicesService', () => {
  let service: LocacionServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocacionServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
