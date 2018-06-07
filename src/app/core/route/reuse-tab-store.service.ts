import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';
import {Menu} from '../nav-menu/menu';

@Injectable()
export class ReuseTabStore {

  private _menus: Menu[] = [];
  private urls: { [key: string]: number } = {};
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  constructor() {
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (this.isInvalid(route)) {
      return null;
    }
    return this.handlers[this.toUrl(route)];
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (this.isInvalid(route)) {
      return false;
    }
    return !!this.handlers[this.toUrl(route)];
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (this.isInvalid(route)) {
      return false;
    }
    return this.urls[this.toUrl(route)] !== undefined;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    let should = future.routeConfig === curr.routeConfig;
    if (should) {
      const path: string = (future.routeConfig && future.routeConfig.path) || null;
      if (!!path) {
        should = this.toUrl(future) === this.toUrl(curr);
      }
    }
    return should;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    this.handlers[this.toUrl(route)] = handle;
  }

  add(menu: Menu): number {
    if (this.urls[menu.path] === undefined) {
      this.urls[menu.path] = this._menus.push(menu) - 1;
    }
    return this.urls[menu.path];
  }

  remove(idx) {
    const url = this._menus[idx].path;
    this._menus.splice(idx, 1);
    delete this.urls[url];
    delete this.handlers[url];
  }

  clear() {
    this._menus = [];
    this.urls = {};
    this.handlers = {};
  }

  clearBut(idx) {
    const menu = this._menus[idx], path = menu.path;
    this._menus = [menu];
    this.urls = {[path]: 0};
    this.handlers = {[path]: this.handlers[path]};
  }

  get menus(): Menu[] {
    return this._menus;
  }

  private isInvalid(route: ActivatedRouteSnapshot): boolean {
    const config = route.routeConfig;
    return !config || !!config.children || !!config.loadChildren;
  }

  private toUrl(route: ActivatedRouteSnapshot): string {
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
