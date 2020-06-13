import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Prediction } from '../pec';

@Injectable({
  providedIn: 'root'
})
export class PecService {

  constructor(private http: HttpClient) { }
  prediction : Prediction

  predict (pec: string): Observable<Prediction> {
    console.log({'reference' :pec})
    return this.http.post<Prediction>('api/predict', {'reference' :pec})
}

}
