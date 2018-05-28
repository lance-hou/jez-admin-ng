import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {delay, tap} from 'rxjs/operators';

@Injectable()
export class SecurityService {

  isLogin = false;

  constructor() {
  }

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLogin = true)
    );
  }

  logout(): void {
    this.isLogin = false;
  }
}
