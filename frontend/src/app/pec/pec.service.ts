import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Prediction } from './pec';

@Injectable({
  providedIn: 'root'
})
export class PecService {

  constructor(private http: HttpClient) { }

  getPrediction (ref: string): Observable<Prediction> {
    console.log({'reference' :ref})
    return this.http.post<Prediction>('api/predict', {'reference' :ref})
}

}
