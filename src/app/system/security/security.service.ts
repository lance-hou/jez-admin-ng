import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from './subject';
import {User} from '../users/user';
import {Subscription} from 'rxjs';

const FORM_DATA_HEADER = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};

@Injectable()
export class SecurityService {

  private _authenticated = localStorage.getItem('authenticated') === 'true';
  private _authorized = false;

  private _user: User;
  private _permissions: string[];
  private _groups: string[];

  private eventEmitter = new EventEmitter(true);

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string, verifyCode?: string): Promise<void> {
    const params = new HttpParams().set('username', username).set('password', password).set('verifyCode', verifyCode);
    return this.httpClient.post('/login', params.toString(), FORM_DATA_HEADER)
      .pipe(
        map(response => {
          this._authenticated = true;
          localStorage.setItem('authenticated', 'true');
        })
      ).toPromise();
  }

  logout(remote = true): void {
    if (remote) {
      this.httpClient.post('/logout', null).toPromise().catch(() => {
      });
    }
    this._authenticated = false;
    localStorage.removeItem('authenticated');
  }

  authorize(): Promise<Subject> {
    return this.httpClient.get<Subject>('/subjects').pipe(
      map(subject => {
        this._user = {...subject.user};
        this._permissions = subject.resources.filter(resource => !resource.permission === false).map(resource => resource.permission);
        this._groups = subject.groups.filter(group => !group.code === false).map(group => group.code);
        this._authorized = true;
        this.eventEmitter.emit({
          user: this._user,
          permissions: this._permissions,
          groups: this._groups
        });
        return subject;
      })
    ).toPromise();
  }

  subscribeAuthorization(generatorOrNext?: any, error?: any, complete?: any): Subscription {
    return this.eventEmitter.subscribe(generatorOrNext, error, complete);
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  get authorized(): boolean {
    return this._authorized;
  }

  get user(): User {
    return this._user;
  }

  get permissions(): string[] {
    return this._permissions;
  }

  get groups(): string[] {
    return this._groups;
  }
}
