import {HttpParams} from '@angular/common/http';

export const emptyLambda = () => {
};

export const filterHttpParams = (parameters: any, filterBlank = true): HttpParams => {
  if (!parameters) {
    return null;
  }
  const filterParameters = {};
  Object.keys(parameters).forEach(key => {
    const value = parameters[key];
    if (value === undefined || value === null) {
      return;
    }
    if (filterBlank && typeof value === 'string' && (value === '' || value.trim() === '')) {
      return;
    }
    filterParameters[key] = value;
  });
  if (Object.keys(filterParameters).length === 0) {
    return null;
  }
  return new HttpParams({fromObject: filterParameters});
};
