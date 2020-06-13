import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Fig } from '../pec';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // paramt : JsonString
  // param2 : string

  constructor(private http: HttpClient) { }
  getImage (param: string, param2 : string) {
    console.log( {'x' :param,'color':param2})
    return this.http.post<Fig>('api/graph', {'x' :param,'color':param2})
}
}
