import {Observable} from 'rxjs';
import {Page} from './page';

export interface PageStore<T> {
  parameters: any;
  sort: string;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  content: T[];
  query: (parameters?: any, sort?: string) => Observable<Page<T>>;
  orderBy: (sort?: string) => Observable<Page<T>>;
  reload: () => Observable<Page<T>>;
  go: (number: number, size?: number) => Observable<Page<T>>;
}
