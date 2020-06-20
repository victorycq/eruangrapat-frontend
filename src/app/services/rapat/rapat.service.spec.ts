import { TestBed } from '@angular/core/testing';

import { RapatService } from './rapat.service';

describe('RapatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RapatService = TestBed.get(RapatService);
    expect(service).toBeTruthy();
  });
});
