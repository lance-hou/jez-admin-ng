import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SECURITY_OPTIONS, SecurityOptions} from './security-options';
import {map} from 'rxjs/operators';
import {SecurityService} from './security.service';
import {SecurityGuardType} from './security-guard-type';

@Injectable()
export class SecurityGuard implements CanActivate, CanActivateChild {

  constructor(
    @Inject(SECURITY_OPTIONS) private securityOptions: SecurityOptions,
    private securityService: SecurityService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    if (url.startsWith(this.securityOptions.loginUrl)) {
      return true;
    } else if (this.securityService.authenticated) {
      return !this.securityService.authorized ? this.securityService.authorize().pipe(map(() => true)) : true;
    } else {
      const commands = new Array<any>(this.securityOptions.loginUrl);
      if (url !== this.securityOptions.rootUrl) {
        commands.push({next: state.url});
      }
      this.router.navigate(commands);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const guard: SecurityGuardType | false = route.firstChild !== null ? route.firstChild.data.guard : route.data.guard;
    if (guard === false) {
      return true;
    }
    let canActivate: Observable<boolean> | Promise<boolean> | boolean;
    if (guard !== undefined) {
      switch (guard.type) {
        case 'url':
          canActivate = this.securityService.hasMenu(state.url);
          break;
        case 'permission':
          canActivate = this.securityService.hasPermission(guard.value);
          break;
        case 'group':
          canActivate = this.securityService.hasGroup(guard.value);
          break;
        case 'resolve':
          canActivate = guard.resolve(this.securityService, route, state);
          break;
        default:
          canActivate = this.securityService.hasMenu(state.url);
          break;
      }
    } else {
      canActivate = this.securityService.hasMenu(state.url);
    }
    if (!canActivate) {
      const redirectUrl = this.securityOptions.forbiddenUrl;
      this.router.navigate([redirectUrl, {url: state.url}]);
    }
    return canActivate;
  }

}
