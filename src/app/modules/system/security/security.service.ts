import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {finalize, tap} from 'rxjs/operators';
import {Subject} from './subject';
import {Observable, Subscription} from 'rxjs';

const FORM_DATA_HEADER = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};

@Injectable()
export class SecurityService {

  private _authenticated = localStorage.getItem('authenticated') === 'true';
  private _authorized = false;

  private _subject: Subject;
  private menus: string[];
  private permissions: string[];
  private groups: string[];

  private eventEmitter = new EventEmitter(true);

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string, verifyCode?: string): Observable<any> {
    const params = new HttpParams().set('username', username).set('password', password).set('verifyCode', verifyCode);
    return this.httpClient.post('/login', params.toString(), FORM_DATA_HEADER)
      .pipe(
        tap(() => this._authenticated = true),
        tap(() => localStorage.setItem('authenticated', 'true'))
      );
  }

  logout(remote = true): void {
    if (remote) {
      this.httpClient.post('/logout', null).pipe(
        finalize(this.clear)
      ).subscribe();
    } else {
      this.clear();
    }
  }

  private clear() {
    this._authenticated = false;
    this._authorized = false;
    this._subject = null;
    this.menus = null;
    this.permissions = null;
    this.groups = null;
    localStorage.removeItem('authenticated');
  }

  authorize(): Observable<any> {
    return this.httpClient.get<Subject>('/subjects').pipe(
      tap(subject => {
        this._subject = subject;
        this.menus = subject.resources.filter(resource => !resource.pathExp === false).map(resource => resource.pathExp);
        this.permissions = subject.resources.filter(resource => !resource.permission === false)
          .map(resource => resource.permission);
        this.groups = subject.groups.filter(group => !group.code === false).map(group => group.code);
        this._authorized = true;
        this.eventEmitter.emit(subject);
      })
    );
  }

  hasMenu(menu: string) {
    return this.authorized && this.menus.includes(menu);
  }

  hasPermission(permission: string) {
    return this.authorized && this.permissions.includes(permission);
  }

  hasGroup(group: string) {
    return this.authorized && this.groups.includes(group);
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

  get subject(): Subject {
    return this._subject;
  }

}
