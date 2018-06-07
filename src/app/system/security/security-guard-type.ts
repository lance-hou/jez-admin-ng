import {Observable} from 'rxjs';
import {SecurityService} from './security.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

export interface SecurityGuardType {

  type: 'url' | 'permission' | 'group' | 'resolve';
  value?: string;
  separator?: 'OR' | 'AND';
  resolve?: (
    securityService: SecurityService,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean;

}
