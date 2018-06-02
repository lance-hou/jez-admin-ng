import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityService} from '../modules/system/security/security.service';
import {SECURITY_OPTIONS, SecurityOptions} from './security-options';
import {map} from 'rxjs/operators';

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
    const url = state.url;
    if (url.startsWith(this.securityOptions.notFoundUrl) || url.startsWith(this.securityOptions.forbiddenUrl)) {
      return true;
    }
    return this.hasMenu(url);
  }

  private hasMenu(url): boolean {
    const canActivate = this.securityService.hasMenu(url);
    if (!canActivate) {
      const redirectUrl = this.securityOptions.forbiddenUrl;
      this.router.navigate([redirectUrl, {url}]);
    }
    return canActivate;
  }

}
