import { TestBed } from '@angular/core/testing';

import { PecService } from './pec.service';

describe('PecService', () => {
  let service: PecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
