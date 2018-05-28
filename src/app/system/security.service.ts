import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

const FORM_DATA_HEADER = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};

@Injectable()
export class SecurityService {

  isLogin = localStorage.getItem('isLogin') === '1';

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string, verifyCode?: string): Promise<void> {
    const params = new HttpParams().set('username', username).set('password', password).set('verifyCode', verifyCode);
    return this.httpClient.post('/login', params.toString(), FORM_DATA_HEADER)
      .pipe(
        map(response => {
          this.isLogin = true;
          localStorage.setItem('isLogin', '1');
        })
      ).toPromise();
  }

  logout(remote = true): void {
    if (remote) {
      this.httpClient.post('/logout', null).toPromise().catch(() => {
      });
    }
    this.isLogin = false;
    localStorage.removeItem('isLogin');
  }

}
