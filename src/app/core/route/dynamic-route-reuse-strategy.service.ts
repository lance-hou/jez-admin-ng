import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
import {ReuseTabStore} from './reuse-tab-store.service';

@Injectable()
export class DynamicRouteReuseStrategy implements RouteReuseStrategy {

  constructor(private reuseTabStore: ReuseTabStore) {
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.reuseTabStore.retrieve(route);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.reuseTabStore.shouldAttach(route);
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.reuseTabStore.shouldDetach(route);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return this.reuseTabStore.shouldReuseRoute(future, curr);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    this.reuseTabStore.store(route, handle);
  }

}
