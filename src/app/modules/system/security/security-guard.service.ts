import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityService} from './security.service';
import {SECURITY_OPTIONS, SecurityOptions} from './security-options';

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
    if (url === this.securityOptions.loginUrl
      || url === this.securityOptions.navigateErrorUrl) {
      return true;
    } else if (!this.securityService.authenticated) {
      const commands = url === ROOT ? [this.securityOptions.loginUrl] : [this.securityOptions.loginUrl, {next: state.url}];
      this.router.navigate(commands)
        .catch(() => this.router.navigate([this.securityOptions.navigateErrorUrl]));
      return false;
    } else if (this.securityService.authorized) {
      return this.checkUrl(url);
    } else {
      return new Promise((resolve, reject) => {
        this.securityService.authorize().then(() => resolve(this.checkUrl(url))).catch(error => reject(error));
      });
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
        this.router.navigate([notFoundUrl, {url}])
          .catch(() => this.router.navigate([this.securityOptions.navigateErrorUrl]));
      }
      return canActivate;
    }
  }

}
