import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from './config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private httpClient: HttpClient) {
  }

  getByCode(code: string): Observable<Config> {
    return this.httpClient.get<Config>(`system/configs/${code}`);
  }

  findByCode(code: string): Observable<Config[]> {
    return this.httpClient.get<Config[]>(`system/configs/${code}?multiple=true`);
  }
}
