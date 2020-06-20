import { TestBed } from '@angular/core/testing';

import { RuanganService } from './ruangan.service';

describe('RuanganService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuanganService = TestBed.get(RuanganService);
    expect(service).toBeTruthy();
  });
});
