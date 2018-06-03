import {Observable} from 'rxjs';

export interface Store<T> {
  parameters: any;
  sort: string;
  data: T[];
  query: (parameters?: any, sort?: string) => Observable<T[]>;
  orderBy: (sort?: string) => Observable<T[]>;
  reload: () => Observable<T[]>;
}
