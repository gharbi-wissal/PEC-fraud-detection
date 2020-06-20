import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
import { Metrics } from '../pec';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  metrics: Metrics
  acc : number
  accBar : number
  isDataAvailable = false
  data : number[]


  constructor(
    private homeService: HomeService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.homeService.getMetrics().subscribe(
      pred => {
        this.metrics=pred;
        this.acc=pred.accuracy
        this.accBar= Math.floor((1- pred.accuracy )* 100) / 100 
        // this.data =[pred.accuracy, Math.floor((1- pred.accuracy )* 100) / 100 ]
        this.data =[0.8, 0.19]

        this.isDataAvailable =true
        console.log(pred)
      
     })  
  }

  public chartType: string = 'doughnut';
  public chartDatasets: Array<any> = [
    { data: [0.8,0.19], label: 'My First dataset' }
    
  ];

  public chartLabels: Array<any> = ['Fraude', 'Non fraude'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { } 
}
