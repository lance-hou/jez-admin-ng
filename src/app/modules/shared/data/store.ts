import {Observable} from 'rxjs';

export interface Store<T> {
  data: T[];
  query: (parameters?: any, sort?: string) => Observable<T[]>;
  reload: () => Observable<T[]>;
}
