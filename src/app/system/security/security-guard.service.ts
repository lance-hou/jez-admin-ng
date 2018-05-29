import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityService} from './security.service';

@Injectable()
export class SecurityGuard implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route, state);
    if (this.securityService.authenticated) {
      return true;
    }
    if (state.url === '/') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login', {next: state.url}]);
    }
    return false;
  }
}
