import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
import {ROUTE_REUSE_STORE, RouteReuseStore} from './route-reuse-store';

@Injectable()
export class DynamicRouteReuseStrategy implements RouteReuseStrategy {

  private detaches: { [key: string]: boolean } = {};
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  constructor(@Inject(ROUTE_REUSE_STORE) private routeStore: RouteReuseStore) {
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (this.isInvalid(route)) {
      return null;
    }
    console.log('retrieve', this.getUrl(route), this.handlers[this.getUrl(route)]);
    return this.handlers[this.getUrl(route)];
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (this.isInvalid(route)) {
      return false;
    }
    console.log('shouldAttach', this.getUrl(route), this.handlers[this.getUrl(route)]);
    return !!this.handlers[this.getUrl(route)];
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (this.isInvalid(route)) {
      return false;
    }
    console.log('shouldDetach', this.getUrl(route), this.detaches[this.getUrl(route)]);
    return this.detaches[this.getUrl(route)];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (this.isInvalid(future)) {
      return false;
    }
    console.log('shouldReuseRoute', this.getUrl(future), future.routeConfig === curr.routeConfig);
    return future.routeConfig === curr.routeConfig;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    console.log('store', this.getUrl(route), handle);
    this.handlers[this.getUrl(route)] = handle;
  }

  private isInvalid(route: ActivatedRouteSnapshot): boolean {
    const config = route.routeConfig;
    return !config || !!config.children || !!config.loadChildren;
  }

  private getUrl(route: ActivatedRouteSnapshot): string {
    let temp: ActivatedRouteSnapshot = route;
    while (temp.firstChild) {
      temp = temp.firstChild;
    }
    const urls = [];
    while (temp) {
      urls.push(temp.url.join('/'));
      temp = temp.parent;
    }
    const url = urls.filter(s => !!s).reverse().join('/');
    return url.startsWith('/') ? url : `/${url}`;
  }

}
