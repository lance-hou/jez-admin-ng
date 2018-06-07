import {ActivatedRouteSnapshot} from '@angular/router/src/router_state';
import {DetachedRouteHandle} from '@angular/router/src/route_reuse_strategy';
import {InjectionToken} from '@angular/core';

export interface RouteReuseStore {

  shouldDetach(route: ActivatedRouteSnapshot): boolean;

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void;

  shouldAttach(route: ActivatedRouteSnapshot): boolean;

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null;

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;

}

export const ROUTE_REUSE_STORE = new InjectionToken<RouteReuseStore>('routeReuseStore');
