export interface Page<T> {
  number: number;
  size: number;
  numberOfElements: number;
  content: T[];
  sort: string;
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
}
