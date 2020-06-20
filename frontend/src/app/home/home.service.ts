import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Metrics } from '../pec';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMetrics (): Observable<Metrics> {
    return this.http.get<Metrics>('api/metrics')
}
}
