import {Injectable} from '@angular/core';
import {RestApi} from '../../shared/data/rest-api';
import {Dict} from './dict';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictService extends RestApi<number, Dict> {

  constructor(httpClient: HttpClient) {
    super('system/dicts', httpClient);
  }

}
