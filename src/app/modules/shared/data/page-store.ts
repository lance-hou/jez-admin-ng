import {Observable} from 'rxjs';
import {Page} from './page';

export interface PageStore<T> {
  data: Page<T>;
  query: (parameters?: any, sort?: string) => Observable<Page<T>>;
  go: (page: number, size: number) => Observable<Page<T>>;
  orderBy: (sort: string) => Observable<Page<T>>;
  reload: () => Observable<Page<T>>;
}
