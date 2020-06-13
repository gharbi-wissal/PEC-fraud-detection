import { Component, OnInit, Predicate } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Pec, Prediction } from '../pec';
import { PecService } from './pec.service';

@Component({
  selector: 'app-pec',
  templateUrl: './pec.component.html',
  styleUrls: ['./pec.component.css']
})
export class PecComponent implements OnInit {

  pec: Pec
  predic : Prediction
  show: boolean = true
  constructor(private pecService : PecService, private http: HttpClient) { }

  ngOnInit(): void {
  }
  predict (pec: string): void {
    this.predic= new Prediction()
    this.pecService.predict(pec).subscribe(
      pred => {
        if ( pred['error'])
          this.show=false
      else {
        this.show=true
        this.predic =pred;
      console.log(pred)
      } 
     })
}

}