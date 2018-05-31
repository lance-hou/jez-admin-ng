import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SecurityService} from './security.service';
import {SECURITY_OPTIONS, SecurityOptions} from './security-options';
import {catchError, map, tap} from 'rxjs/operators';

const ROOT = '/';

@Injectable()
export class SecurityGuard implements CanActivate {

  constructor(
    @Inject(SECURITY_OPTIONS) private securityOptions: SecurityOptions,
    private securityService: SecurityService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    if (url === this.securityOptions.loginUrl) {
      return true;
    } else if (!this.securityService.authenticated) {
      const commands = url === ROOT ? [this.securityOptions.loginUrl] : [this.securityOptions.loginUrl, {next: state.url}];
      this.router.navigate(commands);
      return false;
    } else if (this.securityService.authorized) {
      return this.checkUrl(url);
    } else {
      return this.securityService.authorize().pipe(
        map(() => this.checkUrl(url))
      ).toPromise();
    }
  }

  private checkUrl(url: string): boolean {
    if (url === ROOT
      || url === this.securityOptions.notFoundUrl
      || url === this.securityOptions.forbiddenUrl) {
      return true;
    } else {
      const canActivate = this.securityService.hasMenu(url);
      if (!canActivate) {
        const notFoundUrl = this.securityOptions.notFoundUrl;
        this.router.navigate([notFoundUrl, {url}]);
      }
      return canActivate;
    }
  }

}
