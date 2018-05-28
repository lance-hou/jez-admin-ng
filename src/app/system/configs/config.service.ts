import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private httpClient: HttpClient) {
  }

  getByCode(code: string): Promise<Config> {
    return this.httpClient.get<Config>(`/system/configs/${code}`).toPromise();
  }

  findByCode(code: string): Promise<Config[]> {
    return this.httpClient.get<Config[]>(`/system/configs/${code}?multiple=true`).toPromise();
  }
}
