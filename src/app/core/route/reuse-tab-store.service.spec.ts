import {inject, TestBed} from '@angular/core/testing';

import {ReuseTabStore} from './reuse-tab-store.service';

describe('ReuseTabStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReuseTabStore]
    });
  });

  it('should be created', inject([ReuseTabStore], (service: ReuseTabStore) => {
    expect(service).toBeTruthy();
  }));
});
