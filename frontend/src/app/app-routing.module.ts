import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PecComponent } from './pec/pec.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'pec', component: PecComponent },
  { path: 'dashboard', component: DashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }