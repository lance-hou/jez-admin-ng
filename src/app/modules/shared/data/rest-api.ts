import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from './page';
import {Store} from './store';
import {tap} from 'rxjs/operators';
import {PageStore} from './page-store';
import {filterHttpParams} from '../util/fn';

export class SimpleStore<T> implements Store<T> {

  constructor(private api: RestApi<any, T>) {
  }

  parameters: any;
  sort: string;
  data: T[];

  query(parameters?: any, sort?: string): Observable<T[]> {
    this.parameters = parameters;
    this.sort = sort;
    return this.api.query(parameters, sort).pipe(
      tap((data: T[]) => this.data = data)
    );
  }

  reload(): Observable<T[]> {
    return this.api.query(this.parameters, this.sort).pipe(
      tap((data: T[]) => this.data = data)
    );
  }

}

export class SimplePageStore<T> implements PageStore<T> {

  constructor(private api: RestApi<any, T>, private defaultSize = 10) {
  }

  parameters: any;
  page: number;
  size: number;
  sort: string;
  data: Page<T>;

  private doPage(): Observable<Page<T>> {
    return this.api.queryPage(this.parameters, this.page, this.size, this.sort).pipe(
      tap((data: Page<T>) => this.data = data)
    );
  }

  query(parameters?: any, sort?: string): Observable<Page<T>> {
    this.parameters = parameters;
    this.sort = sort;
    return this.go(1, this.size || this.defaultSize);
  }

  go(page: number, size: number): Observable<Page<T>> {
    this.page = page;
    this.size = size;
    return this.doPage();
  }

  orderBy(sort: string): Observable<Page<T>> {
    this.sort = sort;
    return this.doPage();
  }

  reload(): Observable<Page<T>> {
    return this.doPage();
  }

}

export class RestApi<PK, T> {

  constructor(private url: string, private httpClient: HttpClient) {
  }

  get(id: PK): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  query(parameters?: any, sort?: string): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url, {params: filterHttpParams({_sort: sort, ...parameters})});
  }

  queryPage(parameters: any, page: number, size: number, sort?: string): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(this.url, {
      params: filterHttpParams({
        _page: page - 1,
        _size: size,
        _sort: sort,
        ...parameters
      })
    });
  }

  create(parameters: any): Observable<PK> {
    return this.httpClient.post<PK>(this.url, parameters);
  }

  update(id: PK, parameters: any): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${id}`, parameters);
  }

  delete(id: PK): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  createStore(): Store<T> {
    return new SimpleStore<T>(this);
  }

  createPageStore(defaultSize?: number): PageStore<T> {
    return new SimplePageStore<T>(this, defaultSize);
  }

}
