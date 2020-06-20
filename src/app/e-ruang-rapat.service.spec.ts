import { TestBed } from '@angular/core/testing';

import { ERuangRapatService } from './e-ruang-rapat.service';

describe('ERuangRapatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ERuangRapatService = TestBed.get(ERuangRapatService);
    expect(service).toBeTruthy();
  });
});
