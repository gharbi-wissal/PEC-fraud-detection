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
 
  ngOnInit(): void {}
}
