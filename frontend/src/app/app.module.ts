import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { PecComponent } from './pec/pec.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';


PlotlyViaCDNModule.plotlyVersion = '1.49.4'; // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.plotlyBundle = 'basic'; // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'


@NgModule({
  declarations: [
    AppComponent,
    PecComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PlotlyViaCDNModule,
    BrowserAnimationsModule,
    ChartsModule,
    MDBBootstrapModule.forRoot() 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
