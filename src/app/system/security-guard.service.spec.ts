import { TestBed, inject } from '@angular/core/testing';

import { SecurityGuardService } from './security-guard.service';

describe('SecurityGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityGuardService]
    });
  });

  it('should be created', inject([SecurityGuardService], (service: SecurityGuardService) => {
    expect(service).toBeTruthy();
  }));
});
