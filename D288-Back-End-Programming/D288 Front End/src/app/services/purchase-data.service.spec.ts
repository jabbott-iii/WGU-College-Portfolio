import { TestBed } from '@angular/core/testing';

import { PurchaseDataService } from './purchase-data.service';

describe('PurchaseDataService', () => {
  let service: PurchaseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
