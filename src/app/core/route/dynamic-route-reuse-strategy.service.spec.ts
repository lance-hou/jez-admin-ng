import {inject, TestBed} from '@angular/core/testing';

import {DynamicRouteReuseStrategy} from './dynamic-route-reuse-strategy.service';

describe('DynamicRouteReuseStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicRouteReuseStrategy]
    });
  });

  it('should be created', inject([DynamicRouteReuseStrategy], (service: DynamicRouteReuseStrategy) => {
    expect(service).toBeTruthy();
  }));
});
