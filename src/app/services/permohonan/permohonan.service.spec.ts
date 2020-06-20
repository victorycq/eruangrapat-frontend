import { TestBed } from '@angular/core/testing';

import { PermohonanService } from './permohonan.service';

describe('PermohonanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermohonanService = TestBed.get(PermohonanService);
    expect(service).toBeTruthy();
  });
});
