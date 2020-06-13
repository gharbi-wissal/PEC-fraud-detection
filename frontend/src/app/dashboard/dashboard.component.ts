import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from './dashboard.service';
import { PlotlyViaCDNModule } from 'angular-plotly.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private http: HttpClient
  ) {}
  x: "Mode de gestion";
  color: "Fraud";
  img: string;
  ngOnInit(): void {}
  getPlot(x,color): void {
    this.dashboardService.getImage(x, color).subscribe((res) => {
      this.img=res.figure;
      console.log(res.figure);
      var figure = JSON.parse(res.figure);
      // PlotlyViaCDNModule.newPlot('graph-div', figure.data, figure.layout);

    });
  }

  // getImage(imageUrl: string): Observable<Blob> {
  //   return this.httpClient.get(imageUrl, { responseType: 'blob' });
  // }
}
